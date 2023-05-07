import mongoose from 'mongoose';

// 1. interface for our model
export interface IProductModel extends mongoose.Document { // I goes for Interface
  // we do not declare
  name: string;
  price: number;
  stock: number;
  categoryId: mongoose.Schema.Types.ObjectId;
} 

// 2. schema based on the interface
export const ProductSchema = new mongoose.Schema<IProductModel>({
  name: {
    type: String, // String as a type 
    trim: true, // deletes white spaces, same trim()
    unique: true, // check if exists
    required: [true, "Missing name."], // 
    minlength: [2, "Name too short."],
    maxlength: [100, "Name too long."]
  }, 
  price: {
    type: Number,
    required: [true, "Price missing."],
    min: [0, "Price cannot be neagtive."],
    max: [1000, "Price cannot exceed 1000."]
  },
  stock: {
    type: Number,
    required: [true, "Stock missing."],
    min: [0, "Stock cannot be neagtive."],
    max: [1000, "Stock cannot exceed 1000."]
  },
  categoryId: mongoose.Schema.Types.ObjectId,
}, {
  versionKey: false
});

// 3. model as the final class
export const ProductModel = mongoose.model<IProductModel>("ProductModel", ProductSchema, "products"); // model name, schema, collection name