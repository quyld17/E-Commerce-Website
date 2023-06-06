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
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Sider
      width={200}
      style={{
        background: "colorBgContainer",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[""]}
        defaultOpenKeys={[""]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={items}
      />
    </Sider>
  );
}
