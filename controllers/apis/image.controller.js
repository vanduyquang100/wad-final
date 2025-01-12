import { imgurService } from "../../services/image.service.js";

// Controller for handling upload requests
class ImageController {
  async uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const uploadLink = await imgurService.uploadImage(req.file.buffer);
      res.status(200).json({ link: uploadLink });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const imageController = new ImageController();
