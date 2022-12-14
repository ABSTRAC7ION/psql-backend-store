import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productRoutes from "./handlers/products";
import userRoutes from "./handlers/users";
import orderRoutes from "./handlers/orders";

const app: express.Application = express();
const address: number = 5000;

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

productRoutes(app);

userRoutes(app);

orderRoutes(app);

app.listen(address, function () {
  console.log(`starting app on localhost:${address}`);
});

export default app;
