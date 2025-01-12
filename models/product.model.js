import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    detailDescription: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    promotePrice: {
      type: Number,
      required: false,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      enum: ["on-stock", "out-of-stock", "suspended", "upcoming"],
      default: "on-stock",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    otherImages: { type: [String], required: false, default: [] },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);

export default model("Product", productSchema);
