import getMethodAPI from "../api-types/get-method-api";
import { message } from "antd";

export default function handleProductShowcaseAPI(setProducts) {
  // Declare endpoint for product showcase
  const endpoint = "/images";

  // Call getMethodAPI to handle API request
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
