import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import NavigationBar from "../../components/navigation-bar";
import styles from "../../styles/user-change-password.module.css";

import { Form, Input, Button, message } from "antd";
import UserSideBar from "@/src/components/user/side-bar";
import { handleChangePasswordAPI } from "@/src/api/handlers/user";

const credentialsValidate = (user) => {
  const formValidate = () => {
    if (user.password === "") {
      return "Current password must not be empty! Please try again";
    } else if (user.new_password === "") {
      return "New password must not be empty! Please try again";
    } else if (user.confirm_password === "") {
      return "Confirm password must not be empty! Please try again";
    } else if (user.new_password !== user.confirm_password) {
      return "Passwords not matched! Please try again";
    } else if (user.password === user.new_password) {
      return "New password must be different from current password! Please try again";
    }
    return null;
  };

  const validationError = formValidate();
  if (validationError) {
    return message.error(validationError);
  }
};

export default function PurchaseHistory() {
  const [user, setUser] = useState({
    password: "",
    new_password: "",
    confirm_password: "",
  });
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
      return;
    }
  }, []);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!credentialsValidate(user)) {
      handleChangePasswordAPI(user)
        .then((data) => {
          if (typeof data === "object") {
            // message.success(data.message || "Password changed successfully!");
            message.error("Wrong password");
          } else {
            message.success(data);
          }
        })
        .catch((error) => {
          console.log(error);
          if (typeof error === "object") {
            message.error(error.message || "An error occurred.");
          } else {
            message.error(error);
          }
        });
    }
  };

  return (
    <div>
      <Head>
        <title>Change Password</title>
      </Head>
      <NavigationBar />
      <div className={styles.content}>
        <UserSideBar />
        <div className={styles.details}>
          <p className={styles.changePasswordTitle}>Change Password</p>

          <Form
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 8,
            }}
            layout="horizontal"
            style={{ maxWidth: 1000 }}
          >
            <Form.Item label="Current password">
              <Input.Password
                type="password"
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </Form.Item>

            <Form.Item label="New password" name="new password">
              <Input.Password
                type="password"
                name="new password"
                onChange={(e) =>
                  setUser({ ...user, new_password: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Confirm password" name="confirm password">
              <Input.Password
                type="confirm password"
                name="password"
                onChange={(e) =>
                  setUser({ ...user, confirm_password: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="">
              <Button
                className={styles.changePasswordButton}
                type="primary"
                onClick={handlePasswordChange}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
