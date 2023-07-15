import getMethodAPI from "../methods/get-method-api";
import { message } from "antd";

export default function handleGetAllCategoriesAPI(setCategories) {
  // Declare endpoint for product showcase
  const endpoint = "/categories";

  // Call getMethodAPI to handle API request
  getMethodAPI(
    endpoint,
    // Success callback
    (data) => {
      setCategories(data);
    },
    // Error callback
    (error) => {
      message.error(error);
    }
  );
}
