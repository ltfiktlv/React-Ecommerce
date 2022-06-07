import express from "express";
import Order from "../models/orderModel.js";
import guard from "../middlewareAuthorization.js";
const router = express.Router();

router.route("/").post(guard, async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json("No order items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });
    const orderCreated = await order.save();
    console.log(order);
    res.status(201).json(orderCreated);
  }
});

export default router;