import getMethodAPI from "../api-types/get-method-api";
import { message } from "antd";

export default function handleCartItemAPI(token) {
  return new Promise((resolve, reject) => {
    // Declare an object to product's ID
    const info = {
      token,
    };

    // Declare endpoint for getting product's detail
    const endpoint = "/product-detail";

    // Call postMethodAPI to handle API request
    getMethodAPI(
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
