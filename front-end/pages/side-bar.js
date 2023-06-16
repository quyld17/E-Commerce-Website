import React from "react";
import { LaptopOutlined } from "@ant-design/icons";
import { TbCategory, TbArrowsSort } from "react-icons/tb";
import { MdOutlineChildFriendly } from "react-icons/md";
import {
  BsSortUp,
  BsSortDown,
  BsSortAlphaDown,
  BsSortAlphaUp,
} from "react-icons/bs";
import { Layout, Menu, theme } from "antd";
const { Sider } = Layout;

export default function SideBar() {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(
      "Sorted by",
      "sub1",
      <TbArrowsSort style={{ fontSize: "20px" }} />,
      [
        getItem("Price: High-Low", "1", <BsSortDown />),
        getItem("Price: Low-High", "2", <BsSortUp />),
        getItem("Name: A-Z", "3", <BsSortAlphaDown />),
        getItem("Name: Z-A", "4", <BsSortAlphaUp />),
      ]
    ),
    getItem("Category", "sub2", <TbCategory style={{ fontSize: "20px" }} />, [
      getItem(
        "Child products",
        "5",
        <MdOutlineChildFriendly style={{ fontSize: "20px" }} />
      ),
      getItem("Electronics", "6", <LaptopOutlined />),
    ]),
  ];
  return (
    <Sider
      width={200}
      style={{
        // margin: "24px 0 24px 24px ",
        backgroundColor: "white",
        // position: "fixed",
        // overflow: "auto",
        // height: "100vh",
        // position: "fixed",
        // left: 0,
        // top: 64,
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[""]}
        defaultOpenKeys={[""]}
        style={{
          height: "100%",
          borderRight: 0,
          // borderRadius: 14,
          boxShadow: "0 2px 30px rgba(0, 0, 0, 0.1)",
        }}
        items={items}
      />
    </Sider>
  );
}
