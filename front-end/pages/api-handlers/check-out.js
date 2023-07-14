import getMethodAPI from "../api-types/get-method-api";
import message from "antd";

export function handleGetUserDetails() {
  return new Promise((resolve, reject) => {
    const endpoint = "/users/me/details";

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
