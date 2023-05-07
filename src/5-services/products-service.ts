import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";
import { IProductModel, ProductModel } from "../2-models/product-model";

// Get all products from database: 
async function getAllProducts(): Promise<IProductModel[]> {
  // default: get all products without vitual category:
  // const products = await ProductModel.find().exec();
  // return products;

  return ProductModel.find().populate("category").exec(); // category is the virtual field that we've defined
}

// Get one product
async function getOneProduct(_id: string): Promise<IProductModel> {
  const product = await ProductModel.findById({ _id }).exec();
  if(!product) throw new ResourceNotFoundError(_id);
  return product;
}

// Add product
async function addProduct(product: IProductModel): Promise<IProductModel> {
  const errors = product.validateSync();
  if (errors) throw new ValidationError(errors.message);
  return product.save();
}

// Update product
async function updateProduct(product: IProductModel): Promise<IProductModel> {
  const errors = product.validateSync();
  if (errors) throw new ValidationError(errors.message);

  const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec();
  if (!updatedProduct) throw new ResourceNotFoundError(product._id);
  return updatedProduct;
} // { returnOriginal: false } -> means the function wont return the original obj

// Delete product
async function deleteProduct(_id: string): Promise<void> {
  const productToDelete = await ProductModel.findByIdAndDelete(_id).exec();
  if(!productToDelete) throw new ResourceNotFoundError(_id);
}

async function getSomeProducts(): Promise<IProductModel[]>{
  // return ProductModel.find(filter, projection, options).exec();
  // filter = where
  // projection = select
  // oprions = other manipulations

  // get only products starting with "ch"
  // return ProductModel.find(
  //   {name: { $regex: /^ch.*$/i }}, // /^Ch.*$/i ---> i here is a flag meaning it wond be case sensitive
  //   {_id: false, name: true, price: true}, 
  //   {sort: { price: -1 }})
  //   .exec();

  // return only beverages:
  return ProductModel.find(
    {categoryId: "5e91e29b9c08fc560ce2cf32"}, 
    {_id: false, name: true, price: true, categoryId: true}, 
    {sort: { price: 1 }})
    .populate("category")
    .exec();
}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getSomeProducts
};
