import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import NavigationBar from "../../components/navigation-bar";
import styles from "../../styles/user-profile.module.css";

import { Form, Input, Select, DatePicker, Button } from "antd";
import UserSideBar from "@/components/user/side-bar";
import { handleGetUserDetails } from "@/api/handlers/user";

export default function PurchaseHistory() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
      return;
    }

    handleGetUserDetails()
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Account Profile</title>
      </Head>
      <NavigationBar />
      <div className={styles.content}>
        <UserSideBar />
        <div className={styles.details}>
          <p className={styles.profileTitle}>My Profile</p>

          {user && (
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 10,
              }}
              layout="horizontal"
              style={{ maxWidth: 1000 }}
            >
              <Form.Item label="Email">{user.email}</Form.Item>
              <Form.Item label="Name">
                <Input defaultValue={user.full_name} />
              </Form.Item>
              <Form.Item label="Phone Number">
                <Input defaultValue={user.phone_number} />
              </Form.Item>
              <Form.Item label="Gender">
                <Select defaultValue={user.gender === 1 ? "Male" : "Female"}>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="DatePicker">
                <DatePicker />
              </Form.Item>
              <Form.Item label="">
                <Button
                  className={styles.saveChangesButton}
                  type="primary"
                  onClick={() => handleCheckOut(router, selectedRowKeys)}
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
