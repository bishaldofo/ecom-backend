import { Request, Response } from 'express';
import { OrderServices } from './order.services';
import { OrderModel } from './order.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await OrderServices.createOrderIntoDB(order);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'something wrong',
    });
    console.log(error);
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
