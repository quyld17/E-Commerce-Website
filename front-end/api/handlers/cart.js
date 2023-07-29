import getMethodAPI from "../methods/get-method-api";
import postMethodAPI from "../methods/post-method-api";
import putMethodAPI from "../methods/put-method-api";
import deleteMethodAPI from "../methods/delete-method-api";
import { message } from "antd";

export function handleGetAllCartProductsAPI() {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart";

    getMethodAPI(
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
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

    const endpoint = "/cart";

    postMethodAPI(
      info,
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleAdjustCartProductQuantityAPI(product_id, quantity) {
  return new Promise((resolve, reject) => {
    const info = {
      product_id,
      quantity,
    };

    const endpoint = "/cart/product";

    putMethodAPI(
      info,
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleDeleteCartProductAPI(product_id) {
  return new Promise((resolve, reject) => {
    const endpoint = `/cart/${product_id}`;

    deleteMethodAPI(
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleSelectCartProductsAPI(selectedProduct) {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart";

    putMethodAPI(
      selectedProduct,
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleGetCartSelectedProductsAPI() {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart/selected-products";

    getMethodAPI(
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}
