import getMethodAPI from "../methods/get-method-api";
import postMethodAPI from "../methods/post-method-api";
import putMethodAPI from "../methods/put-method-api";
import deleteMethodAPI from "../methods/delete-method-api";
import { message } from "antd";

export function handleGetAllCartProducts() {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart";

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

export function handleAdjustCartProductQuantity(product_id, quantity) {
  return new Promise((resolve, reject) => {
    const info = {
      product_id,
      quantity,
    };

    const endpoint = "/cart/product/quantity";

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

export function handleDeleteCartProduct(product_id) {
  return new Promise((resolve, reject) => {
    const endpoint = `/cart/product/${product_id}`;

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

export function handleSelectCartProducts(selectedProduct) {
  return new Promise((resolve, reject) => {
    // const info = {
    //   product_id: selectedProduct,
    // };

    const endpoint = "/cart/selection";

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

export function handleGetCartSelectedProducts() {
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
