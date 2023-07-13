import getMethodAPI from "../api-types/get-method-api";
import postMethodAPI from "../api-types/post-method-api";
import { message } from "antd";

export function handleGetAllCartProducts() {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart";

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

export function handleAddToCartAPI(product_id, quantity) {
  return new Promise((resolve, reject) => {
    const info = {
      product_id,
      quantity,
    };

    const endpoint = "/cart/product/addition";

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

export function handleAdjustCartProductQuantity(product_id, quantity) {
  return new Promise((resolve, reject) => {
    const info = {
      product_id,
      quantity,
    };

    const endpoint = "/cart/product/quantity";

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

export function handleSelectCartProducts(selectedProducts) {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart/selection";

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
