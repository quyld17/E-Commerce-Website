import { message } from "antd";
import postMethodAPI from "../api-types/post-method-api";

export default function handleSignInAPI(email, password) {
  // Declare an object to store email and password
  const credentials = {
    email,
    password,
  };

  // Declare endpoint for signing in
  const endpoint = "/sign-in";

  // Call postMethodAPI to handle API request
  postMethodAPI(
    credentials,
    endpoint,
    // Success callback
    (data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    },
    // Error callback
    (error) => {
      message.error(error);
    }
  );
}
