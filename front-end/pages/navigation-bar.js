import Link from "next/link";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import styles from "../styles/navigation-bar.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { BiUserCircle } from "react-icons/bi";
import { Input, Layout, Dropdown } from "antd";
const { Search } = Input;
const { Header } = Layout;

export default function NavigationBar() {
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Retrieve the JWT token from local storage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      // Decode the JWT token
      const decodedToken = jwt_decode(storedToken);

      // Extract the email address from the decoded token
      const userEmail = decodedToken.email;
      setUserEmail(userEmail);
    }
  }, []);

  // Clear the JWT token and user's email local storage after signing out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserEmail("");
  };

  const items = [
    {
      key: "1",
      label: <Link href="/sign-in">Sign in</Link>,
    },
    {
      key: "2",
      label: <Link href="/sign-up">Sign up</Link>,
    },
  ];

  return (
    <Header className={styles.header}>
      <div className={styles.websiteLogo}>
        <Link href="/">Logo</Link>
      </div>

      <Search placeholder="input search text" className={styles.searchBar} />

      <div>
        <Link href="/cart-page">
          <ShoppingCartOutlined className={styles.cartLogo} />
        </Link>
      </div>

      {token ? (
        <>
          <Dropdown
            menu={{
              items: [
                {
                  key: "3",
                  label: <span>Profile</span>,
                },
                {
                  key: "4",
                  label: <span onClick={handleSignOut}>Sign out</span>,
                },
              ],
            }}
            trigger={["click"]}
            placement="bottom"
          >
            <p className={styles.userEmail}>{userEmail}</p>
          </Dropdown>
        </>
      ) : (
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          placement="bottom"
        >
          <BiUserCircle
            onClick={(e) => e.preventDefault()}
            className={styles.userLogo}
          />
        </Dropdown>
      )}
    </Header>
  );
}
