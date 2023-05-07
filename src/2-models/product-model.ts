import mongoose from 'mongoose';
import { CategoryModel } from './category-model';

// 1. interface for our model
export interface IProductModel extends mongoose.Document { // I goes for Interface; .Document is an equivalent to table element 
  // we do not declare id - id ObjectId deals with it
  name: string;
  price: number;
  stock: number;
  categoryId: mongoose.Schema.Types.ObjectId; // === foreign key 
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
  versionKey: false,
  toJSON: { virtuals: true },
  id: false
});

// Virtual property - a property that is not presented in the DB, only inside a model (schema). For instance - adding new fields to a model based on a foreign key.
ProductSchema.virtual("category", {
  ref: CategoryModel,
  localField: "categoryId", // key in ProductModel
  foreignField: "_id", // key in CategoryModel
  justOne: true,
});

// 3. model as the final class
export const ProductModel = mongoose.model<IProductModel>("ProductModel", ProductSchema, "products"); // model name, schema, collection name

// NB: BSON - binary json datatype; all the data stored in MongoDB is in BSON

// in case we have a model that is not presented in the DB, simply omit the collection name (the third argument) upon creating a .model() !!! OR: use autoCreate: false in the options of .Schema