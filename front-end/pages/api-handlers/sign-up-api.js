import { message } from "antd";

const handleSignUpAPI = (email, password) => {
  //Make an object to store email and password
  const user = {
    email,
    password,
  };

  // Make a POST request to create an acount
  fetch("http://localhost:8080/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      if (data.error) {
        message.error(data.error);
      } else {
        window.location.href = "/sign-up-complete ";
      }
    });
};

export default handleSignUpAPI;
