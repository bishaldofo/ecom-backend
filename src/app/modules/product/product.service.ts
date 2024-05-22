import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

// updata a product
const updateProductFromDB = async (id: string, updateInfo: Product) => {
  console.log(id);
  const result = await ProductModel.findByIdAndUpdate(
    { _id: id },
    { $set: updateInfo },
    { new: true },
  );
  return result;
};

// delete prodcut
const deleteProductFromDB = async (_id: string) => {
  const result = await ProductModel.deleteOne({ _id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
