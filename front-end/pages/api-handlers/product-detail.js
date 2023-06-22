import postMethodAPI from "../api-types/post-method-api";
import { message } from "antd";

export default function handleProductDetailAPI(product_id_string) {
  return new Promise((resolve, reject) => {
    // Declare an object to productID
    const info = {
      product_id_string,
    };

    // Declare endpoint for getting product's detail
    const endpoint = "/product-detail";

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
