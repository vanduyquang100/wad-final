import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        additionalInfo: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Cart", cartSchema);
