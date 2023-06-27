import getMethodAPI from "../api-types/get-method-api";
import { message } from "antd";

export default function handleCartProductAPI() {
  return new Promise((resolve, reject) => {
    // Declare endpoint for getting products' details in cart
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
