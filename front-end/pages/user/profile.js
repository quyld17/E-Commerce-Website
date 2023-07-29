import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import NavigationBar from "../../components/navigation-bar";
import styles from "../../styles/user-profile.module.css";

import { Form, Input, Select, DatePicker, Button, message } from "antd";
import UserSideBar from "@/components/user/side-bar";
import { handleGetUserDetailsAPI } from "@/api/handlers/user";

export default function PurchaseHistory() {
  const [user, setUser] = useState();
  const [address, setAddress] = useState();
  const router = useRouter();
  const dateFormat = "YYYY-MM-DD";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
      return;
    }

    handleGetUserDetailsAPI()
      .then((data) => {
        setUser(data.user);
        setAddress(data.address);
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
              <Form.Item label="Date of birth">
                <DatePicker
                  defaultValue={dayjs(user.date_of_birth_string, dateFormat)}
                  allowClear={false}
                />
              </Form.Item>
              {address && (
                <Form.Item label="Address">
                  <Input
                    defaultValue={
                      address.house_number +
                      ", " +
                      address.street +
                      ", " +
                      address.ward +
                      ", " +
                      address.district +
                      ", " +
                      address.city
                    }
                  />
                </Form.Item>
              )}

              <Form.Item label="">
                <Button
                  className={styles.saveChangesButton}
                  type="primary"
                  onClick={() =>
                    message.success("Updated profile successfully!")
                  }
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
