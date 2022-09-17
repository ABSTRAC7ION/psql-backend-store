import express, { Request, Response } from "express";
import { Product, productStore } from "../models/product";
const jwt = require("jsonwebtoken");

const store = new productStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(404);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    console.log(product);

    const newProduct = await store.create(product);

    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }

  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
  app.delete("/products/:id", destroy);
};

export default productRoutes;
