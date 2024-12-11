import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "canceled"],
      default: "pending",
    },
    address: {
      street: {
        type: String,
        // required: true,
      },
      city: {
        type: String,
        // required: true,
      },
      state: {
        type: String,
        // required: true,
      },
      zip: {
        type: String,
        // required: true,
      },
      country: {
        type: String,
        // required: true,
      },
    },
    paymentInfo: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Order", orderSchema);
