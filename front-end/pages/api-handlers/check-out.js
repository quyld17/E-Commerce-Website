import getMethodAPI from "../api-types/get-method-api";
import message from "antd";

export function handleGetUserDetails() {
  return new Promise((resolve, reject) => {
    const endpoint = "/users/user/details";

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
