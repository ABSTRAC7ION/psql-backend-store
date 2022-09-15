CREATE TABLE order_products ( id SERIAL PRIMARY KEY, quantity integer, order_id bigint REFERENCES orders(id), FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE, product_id bigint REFERENCES product(id), FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE );