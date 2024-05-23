import { Request, Response } from 'express';
import { OrderServices } from './order.services';
import { orderValidationSchema } from './order.validation';
import { ProductModel } from '../product/product.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const order = orderValidationSchema.parse(data);

    const product = await ProductModel.findById(order.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if there is sufficient stock
    if (product.inventory.quantity < order.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    // Deduct the ordered quantity from the product's inventory
    product.inventory.quantity -= order.quantity;

    // Update the inStock status based on the remaining quantity
    product.inventory.inStock = product.inventory.quantity > 0;

    // Save the updated product
    await product.save();

    // Create the order in the database
    const result = await OrderServices.createOrderIntoDB(order);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrderServices.getAllOrdersFromDB(email);
    if (email) {
      if (!result) {
        return res.status(500).json({
          success: false,
          message: 'Order not found',
        });
      } else {
        if (result.length === 0) {
          return res.json({
            success: false,
            message: 'no order found for this user email!',
            data: result,
          });
        }
        return res.json({
          success: true,
          message: 'Orders fetched successfully for user email!',
          data: result,
        });
      }
    }

    res.json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
