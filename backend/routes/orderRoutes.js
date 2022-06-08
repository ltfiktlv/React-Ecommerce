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
    res.status(201).json(orderCreated);
  }
});

router.route("/:id").get(guard, async (req, res) => {
  const order = await Order.findById(req.params._id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json("Order doesn't exist.");
  }
});

export default router;
