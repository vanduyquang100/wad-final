import axios from "axios";
import multer from "multer";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();

// Configure multer for file uploads
export const upload = multer({ storage: multer.memoryStorage() });

class CloudinaryService {
  constructor() {
    this.cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
    this.apiKey = process.env.CLOUDINARY_API_KEY;
    this.apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!this.apiKey || !this.apiSecret || !process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error("Cloudinary configuration is incomplete.");
    }
  }

  generateSignature(params) {
    const sortedParams = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return crypto
      .createHash("sha1")
      .update(sortedParams + this.apiSecret)
      .digest("hex");
  }

  async uploadImage(imageBuffer) {
    try {
      const timestamp = Math.floor(Date.now() / 1000);

      // Parameters to sign
      const paramsToSign = {
        use_filename: true,
        timestamp,
      };

      // Generate signature
      const signature = this.generateSignature(paramsToSign);

      // Prepare form data
      const formData = new URLSearchParams();
      formData.append(
        "file",
        `data:image/png;base64,${imageBuffer.toString("base64")}`
      );
      formData.append("use_filename", "true");
      formData.append("timestamp", timestamp);
      formData.append("api_key", this.apiKey);
      formData.append("signature", signature);

      // Make the request
      const response = await axios.post(
        this.cloudinaryUrl,
        formData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Return the secure URL of the uploaded image
      return response.data.secure_url;
    } catch (error) {
      console.error(
        "Cloudinary upload error:",
        error.response?.data || error.message
      );
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  }
}

// ImgurService handles the interaction with Imgur API
class ImgurService {
  constructor() {
    this.imgurApiUrl = "https://api.imgur.com/3/image";
    this.alterImgurApiUrl = "https://api.imgur.com/3/upload";
    this.imgurClientId = process.env.IMGUR_CLIENT_ID; // Set your Imgur Client ID in environment variables
    if (!this.imgurClientId) {
      throw new Error("IMGUR_CLIENT_ID environment variable is not set");
    }
  }

  async uploadImage(imageBuffer) {
    try {
      let response = await axios.post(
        this.imgurApiUrl,
        { image: imageBuffer.toString("base64"), type: "base64" },
        {
          headers: {
            Authorization: `Client-ID ${this.imgurClientId}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        response = await axios.post(
          this.alterImgurApiUrl,
          { image: imageBuffer.toString("base64"), type: "base64" },
          {
            headers: {
              Authorization: `Client-ID ${this.imgurClientId}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.data && response.data.data && response.data.data.link) {
        return response.data.data.link;
      }

      throw new Error(`Failed to upload image, ${response.message}`);
    } catch (error) {
      console.error(
        "Imgur upload error:",
        error.response?.data || error.message
      );
      throw new Error(`Imgur upload failed: ${error.message}`);
    }
  }
}

export const imgurService = new CloudinaryService();
