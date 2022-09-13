// @ts-ignore
import client from "../database";

export type Order_Products = {
  quantity: number;
  orderId: string;
  productId: string;
};

export type Order = {
  status: string;
  userId: number;
};

export class orderStore {
  async show(orderId: string): Promise<Order_Products> {
    try {
      const sql = "SELECT * FROM order_products WHERE order_id=($1)";
      //@ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [orderId]);

      const order: any = [];

      for (let i = 0; i < result.rows.length; i++) {
        order.push(result.rows[i]);
      }

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not show order ${orderId}: ${err}`);
    }
  }

  async create(status: string, userId: number): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [status, userId]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could create a new order ${userId}. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order_Products> {
    // get order to see if it is open
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      //@ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [parseInt(orderId)]);

      const order = result.rows[0];

      if (order.status !== "open") {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      console.log("error");
      throw new Error(`${err}`);
    }

    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
