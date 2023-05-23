import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { BiUserCircle } from "react-icons/bi";
import { Input, Layout } from "antd";
const { Search } = Input;
const { Header } = Layout;

export default function NavigationBar() {
  const onSearch = (value) => console.log(value);
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{ color: "white", marginLeft: "20px" }}
        className="website-logo"
      >
        <Link href="/">Logo</Link>
      </div>

      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          maxWidth: 1000,
          marginLeft: "50px",
        }}
      />

      <div
        style={{ color: "white", display: "right", margin: "0 20px" }}
        className="cart-logo"
      >
        <Link href="/cart-page">
          <ShoppingCartOutlined
            style={{ fontSize: "30px", marginTop: "20px" }}
          />
        </Link>
      </div>

      <div
        style={{ color: "white", justifyContent: "flex-end" }}
        className="profile-logo"
      >
        <Link href="/profile-page">
          <BiUserCircle style={{ fontSize: "30px", marginTop: "25px" }} />
        </Link>
      </div>
    </Header>
  );
}
