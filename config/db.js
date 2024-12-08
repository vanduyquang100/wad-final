import { connect } from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import dummyProducts from "../config/dummyProducts.js";

dotenv.config();

async function seedDatabase() {
  try {
    await Product.deleteMany({});
    await Cart.deleteMany({});
    console.log("Old data deleted");

    await Product.insertMany(dummyProducts);
    console.log("Dummy data inserted");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
    if (process.env.NODE_ENV === "development") {
      await seedDatabase();
      console.log("Database seeded successfully");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
