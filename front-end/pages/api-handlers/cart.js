import getMethodAPI from "../api-types/get-method-api";
import postMethodAPI from "../api-types/post-method-api";
import { message } from "antd";

export function handleCartProductAPI() {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart";

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

export function handleCartProductQuantityChangeAPI(product_id, quantity) {
  return new Promise((resolve, reject) => {
    // Declare an object to store token and product's id
    const info = {
      product_id,
      quantity,
    };

    const endpoint = "/cart-product-quantity-change";

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

export function handleAddToCartAPI(product_id, quantity) {
  return new Promise((resolve, reject) => {
    // Declare an object to store token and product's id
    const info = {
      product_id,
      quantity,
    };

    const endpoint = "/add-to-cart";

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

export function handleSelectedProductInCartAPI(products) {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart";

    // Call getMethodAPI to handle API request
    postMethodAPI(
      products,
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

export function handleCheckOutAPI(checkoutData) {
  return new Promise((resolve, reject) => {
    const endpoint = "/check-out";

    postMethodAPI(
      checkoutData,
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
