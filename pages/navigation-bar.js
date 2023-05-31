import Link from "next/link";
import styles from "../styles/navigation-bar.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { BiUserCircle } from "react-icons/bi";
import { Input, Layout, Dropdown } from "antd";
const { Search } = Input;
const { Header } = Layout;

export default function NavigationBar() {
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

      <div className="profile-logo">
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
      </div>
    </Header>
  );
}
