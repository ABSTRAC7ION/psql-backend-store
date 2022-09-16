import express, { Request, Response } from "express";
import { orderStore } from "../models/order";
const jwt = require("jsonwebtoken");

const store = new orderStore();

const show = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }

  const orderId: string = req.params.id;
  try {
    const showOrder = await store.show(orderId);
    res.json(showOrder);
  } catch (err) {
    res.status(400);
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

  //1-getting id from token
  const token = req.body.token;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId: number = parseInt(decoded.user.id);
  //2-setting status to open until user checks out
  const status: string = "open";
  console.log(userId);
  try {
    const createOrder = await store.create(status, userId);
    res.json(createOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  try {
    const token = _req.body.token;
    jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }

  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  console.log(orderId, productId, quantity);
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders/:id", show);
  app.post("/orders", create);
  app.post("/orders/:id/products", addProduct);
};

export default orderRoutes;
