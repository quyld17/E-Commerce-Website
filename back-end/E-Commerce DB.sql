CREATE DATABASE ecw;

CREATE TABLE `users` (
  `user_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `full_name` CHAR(30),
  `date_of_birth` DATETIME,
  `phone_number` CHAR(11),
  `gender` TINYINT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE `addresses` (
  `address_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `district` VARCHAR(255) NOT NULL,
  `ward` VARCHAR(255) NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  `house_number` VARCHAR(255) NOT NULL,
  `is_default` TINYINT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

CREATE TABLE `orders` (
  `order_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `total_price` DECIMAL(12,0) NOT NULL,
  `payment_method` VARCHAR(255) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE `order_products` (
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(12,0) NOT NULL
);

CREATE TABLE `products` (
  `product_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(12,0) NOT NULL,
  `in_stock_quantity` INT NOT NULL
);

CREATE TABLE `product_images` (
  `product_id` INT NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `is_thumbnail` TINYINT NOT NULL
);

CREATE TABLE `categories` (
  `category_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NOT NULL
);

CREATE TABLE `cart_products` (
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `selected` BOOLEAN DEFAULT FALSE
);

CREATE UNIQUE INDEX `order_products_index_0` ON `order_products` (`order_id`, `product_id`);

CREATE UNIQUE INDEX `cart_products_index_1` ON `cart_products` (`user_id`, `product_id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `order_products` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

ALTER TABLE `order_products` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

ALTER TABLE `cart_products` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `cart_products` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `product_images` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
