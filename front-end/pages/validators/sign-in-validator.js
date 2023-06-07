import validator from "validator";
import { message } from "antd";
import handleSignInAPI from "../api-handlers/sign-in-api";

const handleSubmit = async (email, password) => {
  //Credentials validation
  const validateForm = () => {
    if (!email) {
      return "Email must not be empty! Please try again";
    } else if (!password) {
      return "Password must not be empty! Please try again";
    } else if (!validator.isEmail(email)) {
      return "Invalid email address! Email must include '@' and a domain";
    }
    return null;
  };

  const validationError = validateForm();
  if (validationError) {
    message.error(validationError);
    return;
  }

  //API handle
  handleSignInAPI(email, password);
};

export default handleSubmit;
