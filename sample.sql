-- not for production code
DROP TABLE IF EXISTS "product-options";
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id SERIAL NOT NULL,
  guid VARCHAR(36) UNIQUE PRIMARY KEY NOT NULL,
  name  VARCHAR(255) null,
  description VARCHAR(255) null,
  price decimal null,
  delivery_price decimal null,
  is_new boolean null,
  is_deleted boolean null
);

CREATE TABLE "product-options" (
  id SERIAL NOT NULL,
  guid VARCHAR(36) unique PRIMARY KEY,
  product_id VARCHAR(36),
  name  VARCHAR(255) null,
  description VARCHAR(255) null,
  is_new boolean null,
  is_deleted boolean null,
  foreign key (product_id) references products(guid)
);
