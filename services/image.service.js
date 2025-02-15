import axios from "axios";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();

// Configure multer for file uploads
export const upload = multer({ storage: multer.memoryStorage() });

// ImgurService handles the interaction with Imgur API
class ImgurService {
  constructor() {
    this.imgurApiUrl = "https://api.imgur.com/3/upload";
    this.alterImgurApiUrl = "https://api.imgur.com/3/image";
    this.imgurClientId = process.env.IMGUR_CLIENT_ID; // Set your Imgur Client ID in environment variables
    if (!this.imgurClientId) {
      throw new Error("IMGUR_CLIENT_ID environment variable is not set");
    }
  }

  async uploadImage(imageBuffer) {
    try {
      let response = await axios.post(
        this.imgurApiUrl,
        { image: imageBuffer.toString("base64") },
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
          { image: imageBuffer.toString("base64") },
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

export const imgurService = new ImgurService();
