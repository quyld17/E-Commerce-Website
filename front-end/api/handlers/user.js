import getMethodAPI from "../methods/get-method-api";
import message from "antd";

export function handleGetUserDetails() {
  return new Promise((resolve, reject) => {
    const endpoint = "/users/me";

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
