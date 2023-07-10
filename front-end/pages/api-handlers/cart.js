import getMethodAPI from "../api-types/get-method-api";
import postMethodAPI from "../api-types/post-method-api";
import { message } from "antd";

export function handleGetAllCartProducts() {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart/products";

    // Call getMethodAPI to handle API request
    getMethodAPI(
      endpoint,
      // Success callback
      (data) => {
        resolve(data);
      },
      // Error callback
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleAdjustCartProductQuantity(product_id, quantity) {
  return new Promise((resolve, reject) => {
    // Declare an object to store token and product's id
    const info = {
      product_id,
      quantity,
    };

    const endpoint = "/cart/products/product/quantity/adjust";

    // Call postMethodAPI to handle API request
    postMethodAPI(
      info,
      endpoint,
      // Success callback
      (data) => {
        resolve(data);
      },
      // Error callback
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleGetCartSelectedProducts(selectedProducts) {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart/products/selected";

    postMethodAPI(
      selectedProducts,
      endpoint,
      // Success callback
      (data) => {
        resolve(data);
      },
      // Error callback
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleAddToCartAPI(product_id, quantity) {
  return new Promise((resolve, reject) => {
    // Declare an object to store token and product's id
    const info = {
      product_id,
      quantity,
    };

    const endpoint = "/cart/products/product/add";

    // Call postMethodAPI to handle API request
    postMethodAPI(
      info,
      endpoint,
      // Success callback
      (data) => {
        resolve(data);
      },
      // Error callback
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}
