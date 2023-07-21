import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import styles from "../styles/navigation-bar.module.css";
import { handleGetAllCartProductsAPI } from "../api/handlers/cart";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { BiUserCircle } from "react-icons/bi";
import { Input, Layout, Dropdown, Badge, message } from "antd";

const { Search } = Input;
const { Header } = Layout;

export default function NavigationBar() {
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [cartProductsCount, setCartProductsCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      const decodedToken = jwt_decode(storedToken);
      const expTime = decodedToken.exp;
      const currentTime = Date.now() / 1000;

      if (currentTime > expTime) {
        message.info("Session expired! Please sign in to continue");
        handleSignOut();
      } else {
        const userEmail = decodedToken.email;
        setUserEmail(userEmail);
      }
      handleGetAllCartProductsAPI()
        .then((data) => {
          const cartProductsLength = data.cart_products.length;
          setCartProductsCount(cartProductsLength);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, []);

  const handleCartLogoClick = () => {
    if (!token) {
      router.push("/sign-in");
    } else {
      router.push("/cart");
    }
  };

  // Clear the JWT token and user's email local storage after signing out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserEmail("");
    router.push("/");
    message.success("Sign out successfully!");
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
        <Badge
          showZero
          size="small"
          count={cartProductsCount}
          offset={[-20, 25]}
        >
          <ShoppingCartOutlined
            className={styles.cartLogo}
            onClick={handleCartLogoClick}
          />
        </Badge>
      </div>

      {token ? (
        <Dropdown
          menu={{
            items: [
              {
                key: "3",
                label: <Link href="/user/profile">Profile</Link>,
              },
              {
                key: "4",
                label: (
                  <Link href="/user/purchase-history">Purchase History</Link>
                ),
              },
              {
                key: "5",
                label: <span onClick={handleSignOut}>Sign out</span>,
              },
            ],
          }}
          trigger={["click", "hover"]}
          placement="bottom"
        >
          <p className={styles.userEmail}>{userEmail}</p>
        </Dropdown>
      ) : (
        <Dropdown
          menu={{ items }}
          trigger={["click", "hover"]}
          placement="bottom"
        >
          <div className={styles.userLogoWrapper}>
            <BiUserCircle className={styles.userLogo} />
          </div>
        </Dropdown>
      )}
    </Header>
  );
}
