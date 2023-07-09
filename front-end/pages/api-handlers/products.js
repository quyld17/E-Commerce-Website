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

export function handleGetProductDetailsAPI(product_id_string) {
  return new Promise((resolve, reject) => {
    const info = {
      product_id_string,
    };

    const endpoint = "/products/product/details";

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
