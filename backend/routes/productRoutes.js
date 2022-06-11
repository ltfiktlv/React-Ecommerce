import express from "express";
import Product from "../models/productModel.js";
import { guard, isAdmin } from "../middlewareAuthorization.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(404).json({ message: `There is no product in storage.` });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: `Product not found.` });
  }
});
router.route("/:id").delete(guard, isAdmin, async (req, res) => {
  //only Admin acc can delete it.

  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.send("Product deleted.");
  } else {
    res.send("Product not found.");
  }
});
router.route("/:id").put(guard, isAdmin, async (req, res) => {
  //only Admin acc can update it.
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.image = req.body.image || product.image;
    product.description = req.body.description || product.description;
  }
  const updateProduct = await product.save();
  res.json({
    _id: updateProduct._id,
    name: updateProduct.name,
    category: updateProduct.category,
    price: updateProduct.price,
    countInStock: updateProduct.countInStock,
    image: updateProduct.image,
    description: updateProduct.description,
  });
});
router.route("/:id").post(guard, isAdmin, async (req, res) => {
  //only Admin acc can create it.
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    countInStock: req.body.countInStock,
    image: req.body.image,
    description: req.body.description,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
export default router;
