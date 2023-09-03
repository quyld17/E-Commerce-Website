import getMethodAPI from "../methods/get-method-api";
import { message } from "antd";

export function handleGetAllProductsAPI(currentPage) {
  return new Promise((resolve, reject) => {
    const endpoint = "/products?page=" + `${currentPage}`;

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

export function handleGetProductDetailsAPI(product_id) {
  return new Promise((resolve, reject) => {
    const endpoint = `/products/${product_id}`;

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
