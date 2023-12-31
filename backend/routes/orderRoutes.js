import express from "express";
import Order from "../models/orderModel.js";
import { guard, isAdmin } from "../middlewareAuthorization.js";
import Stripe from "stripe";

const router = express.Router();
router.route("/adminOrders").get(guard, isAdmin, async (req, res) => {
  //admin get Orders
  const orders = await Order.find({}).populate("user", "id name");
  res.send(orders);
});

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
router.route("/").get(guard, async (req, res) => {
  try {
    const order = await Order.find({});
    res.json(order);
  } catch (err) {
    res.status(404).json({ message: `There is no order.` });
  }
});

router.route("/:id").put(guard, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: `${order.totalPrice * 100}`,
      currency: "usd",
      payment_method_types: ["card"],
    });

    order.isPaid = true;
    order.paidAt = Date.now();

    const updateOrder = await order.save();
    res.status(200).send(updateOrder);
    res.status(200).send(paymentIntent.client_secret);
  } else {
    res.status(404).json("Order doesn't exist.");
  }
});
router.route("/myorders").get(guard, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.send(orders);
});
router.route("/:id").get(guard, async (req, res) => {
  const orderDetail = await Order.findById(req.params.id).populate(
    "user",
    "name id"
  );

  res.json(orderDetail);
});

router.route("/deliver/:id").put(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order.isPaid) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliverOrder = await order.save();
    console.log(deliverOrder);
    res.send(deliverOrder);
  } else {
    res.send("Not delivered");
  }
});
export default router;
