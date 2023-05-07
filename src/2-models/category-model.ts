import mongoose from "mongoose"
import { ProductSchema } from "./product-model";

// 1. interface
export interface ICategoryModel extends mongoose.Document {
  name: string;
  description: string;
};

// 2. schema
export const CategorySchema = new mongoose.Schema<ICategoryModel>({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minlength: [3, "Name is too short."],
    maxlength: [60, "Name too long."],
    unique: true
  }, 
  description: {
    type: String,
    required: [true, "Description is required."],
    trim: true,
    minlength: [30, "Description is too short."],
    maxlength: [300, "Description too long."],
  }
}, {
  versionKey: false
});


// 3. model
export const CategoryModel = mongoose.model<ICategoryModel>("CategoryModel", CategorySchema, "categories");