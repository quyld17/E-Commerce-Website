import postMethodAPI from "../api-types/post-method-api";
import { message } from "antd";

export default function handleAddToCartAPI(product_id, quantity) {
  return new Promise((resolve, reject) => {
    // Declare an object to store token and product's id
    const info = {
      product_id,
      quantity,
    };

    // Declare endpoint for getting product's detail
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
