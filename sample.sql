-- not for production code
DROP TABLE IF EXISTS "product-options";
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  guid VARCHAR(36) PRIMARY KEY,
  name  VARCHAR(255) null,
  description VARCHAR(255) null,
  price decimal null,
  delivery_price decimal null,
  is_new boolean null,
  is_deleted boolean null
);

CREATE TABLE "product-options" (
  guid VARCHAR(36) PRIMARY KEY,
  product_id VARCHAR(36),
  name  VARCHAR(255) null,
  description VARCHAR(255) null,
  is_new boolean null,
  is_deleted boolean null,
  foreign key (product_id) references products(guid)
);
