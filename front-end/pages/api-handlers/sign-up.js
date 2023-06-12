import { message } from "antd";
import postMethodAPI from "./api-types/post-method-api";

export default function handleSignUpAPI(email, password) {
  // Declare an object to store email and password
  const credentials = {
    email,
    password,
  };

  // Declare endpoint for signing up
  const endpoint = "/sign-up";

  // Call postMethodAPI to handle API request
  postMethodAPI(
    credentials,
    endpoint,
    // Success callback
    () => {
      window.location.href = "/sign-up-complete";
    },
    // Error callback
    (error) => {
      message.error(error);
    }
  );
}
