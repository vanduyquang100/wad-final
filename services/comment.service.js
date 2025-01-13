import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import Product from "../models/product.model.js";

class CommentService {
  // Post a comment on a product
  async postComment({ userId, productId, content, rating }) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const comment = new Comment({
      content,
      rating,
      user: userId,
      product: productId,
    });

    await comment.save();

    // Update product's average rating
    const averageRating = await this.calculateAverageRating(productId);
    product.averageRating = averageRating;
    await product.save();

    return { comment, averageRating };
  }

  // Like a comment
  async likeComment(commentId, userId) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    // Check if the user has already liked the comment
    if (comment.likedBy.includes(userId)) {
      throw new Error("User has already liked this comment");
    }

    comment.likes += 1;
    comment.likedBy.push(userId);
    await comment.save();

    return comment;
  }

  // Load comments with pagination
  async getCommentsByProduct({
    productId,
    userId,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  }) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      const skip = (page - 1) * limit;
      const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

      const comments = await Comment.find({ product: productId })
        .populate("user", "name profilePic") // Include user details
        .sort(sort)
        .skip(skip)
        .limit(limit);

      const totalComments = await Comment.countDocuments({
        product: productId,
      });

      // Map comments to include `userLiked` for the requesting user
      const commentsWithUserLiked = comments.map((comment) => ({
        ...comment.toObject(),
        userLiked: comment.likedBy.includes(userId), // Check if the user liked this comment
      }));

      return {
        comments: commentsWithUserLiked,
        totalComments,
        page,
        limit,
        totalPages: Math.ceil(totalComments / limit),
        averageRating: product.averageRating || null,
      };
    } catch (e) {
      console.log(e);
    }
  }

  // Calculate average rating for a product
  async calculateAverageRating(productId) {
    const ratings = await Comment.aggregate([
      { $match: { product: productId } },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } },
    ]);

    return ratings.length > 0 ? ratings[0].averageRating : null;
  }
}

export const commentService = new CommentService();
