import { commentService } from "../../services/comment.service.js";

class CommentController {
  async postComment(req, res) {
    try {
      const { id: productId } = req.params;
      const { content, rating } = req.body;
      const userId = req.user?._id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const result = await commentService.postComment({
        userId,
        productId,
        content,
        rating,
      });

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getComments(req, res) {
    try {
      const { productId } = req.params;
      const { page, limit, sortBy, sortOrder } = req.query;
      const userId = req.user?._id;

      const result = await commentService.getCommentsByProduct({
        productId,
        userId,
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sortBy,
        sortOrder,
      });

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async likeComment(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.user?._id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const updatedComment = await commentService.likeComment(
        commentId,
        userId
      );
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.user?._id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const result = await commentService.deleteComment(commentId, userId);
      if (!result) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const commentApiController = new CommentController();
