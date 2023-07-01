CREATE TABLE `user` (
  `user_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `full_name` CHAR(30),
  `date_of_birth` DATETIME,
  `phone_number` CHAR(11),
  `address` VARCHAR(255),
  `gender` TINYINT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE `order` (
  `order_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `total_price` DECIMAL(12,0) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `created_at` datetime NOT NULL
);

CREATE TABLE `order_products` (
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(12,0) NOT NULL
);

CREATE TABLE `product` (
  `product_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(12,0) NOT NULL,
  `in_stock_quantity` INT NOT NULL
);

CREATE TABLE `product_image` (
  `product_id` INT NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `is_thumbnail` TINYINT NOT NULL
);

CREATE TABLE `category` (
  `category_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NOT NULL
);

CREATE TABLE `cart_product` (
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL
);

CREATE UNIQUE INDEX `order_products_index_0` ON `order_products` (`order_id`, `product_id`);

CREATE UNIQUE INDEX `cart_product_index_1` ON `cart_product` (`user_id`, `product_id`);

ALTER TABLE `order` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `order_products` ADD FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`);

ALTER TABLE `order_products` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `product` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

ALTER TABLE `cart_product` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `cart_product` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `product_image` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);
