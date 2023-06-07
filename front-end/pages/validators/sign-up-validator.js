import validator from "validator";
import { message } from "antd";
import handleSignUpAPI from "../api-handlers/sign-up-api";

const handleSubmit = async (email, password, confirmPassword) => {
  //Credentials validation
  const validateForm = () => {
    if (!email) {
      return "Email must not be empty! Please try again";
    } else if (!password) {
      return "Password must not be empty! Please try again";
    } else if (!confirmPassword) {
      return "Confirm password must not be empty! Please try again";
    } else if (!validator.isEmail(email)) {
      return "Invalid email address! Email must include '@' and a domain";
    } else if (password !== confirmPassword) {
      return "Passwords do not match! Please try again";
    }
    return null;
  };

  const validationError = validateForm();
  if (validationError) {
    message.error(validationError);
    return;
  }

  //API handle
  handleSignUpAPI(email, password);
};

export default handleSubmit;
