import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import styles from "../styles/navigation-bar.module.css";
import handleCartItemAPI from "./api-handlers/cart";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { BiUserCircle } from "react-icons/bi";
import { Input, Layout, Dropdown, Badge } from "antd";
const { Search } = Input;
const { Header } = Layout;

export default function NavigationBar() {
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [productCount, setProductCount] = useState();
  const router = useRouter();

  useEffect(() => {
    // handleCartItemAPI()
    //   .then((data) => {
    //     setProductCount(data.length);
    //   })
    //   .catch((error) => {
    //     console.log("Error: ", error);
    //   });
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
        <Badge count={productCount} offset={[-20, 25]}>
          <ShoppingCartOutlined
            className={styles.cartLogo}
            onClick={handleCartLogoClick}
          />
        </Badge>
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
          <div className={styles.userLogoWrapper}>
            <BiUserCircle className={styles.userLogo} />
          </div>
        </Dropdown>
      )}
    </Header>
  );
}
