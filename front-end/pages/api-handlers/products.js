import getMethodAPI from "../api-types/get-method-api";
import postMethodAPI from "../api-types/post-method-api";
import { message } from "antd";

export function handleGetAllProductsAPI(setProducts) {
  const endpoint = "/products";

  getMethodAPI(
    endpoint,
    // Success callback
    (data) => {
      setProducts(data);
    },
    // Error callback
    (error) => {
      message.error(error);
    }
  );
}

export function handleGetProductDetailsAPI(product_id) {
  return new Promise((resolve, reject) => {
    const endpoint = `/products/${product_id}`;

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
