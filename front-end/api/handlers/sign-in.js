import { message } from "antd";
import postMethodAPI from "../methods/post-method-api";

export default function handleSignInAPI(email, password) {
  return new Promise((resolve, reject) => {
    const credentials = {
      email,
      password,
    };

    const endpoint = "/sign-in";
    postMethodAPI(
      credentials,
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
