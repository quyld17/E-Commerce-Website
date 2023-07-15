import React from "react";
import SideBarMaterials from "./side-bar-materials";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

export default function SideBar() {
  const { sortingItems, categoryItems } = SideBarMaterials();

  const renderMenuItems = (menuItems) => {
    return menuItems.map((menuItem) => {
      if (menuItem.items) {
        return (
          <Menu.SubMenu
            key={menuItem.key}
            title={
              <span>
                {menuItem.icon}
                {menuItem.label}
              </span>
            }
          >
            {renderMenuItems(menuItem.items)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={menuItem.key}>
            {menuItem.icon}
            {menuItem.label}
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Sider
      width={200}
      style={{
        backgroundColor: "white",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[""]}
        defaultOpenKeys={[""]}
        style={{
          height: "100%",
          borderRight: 0,
          boxShadow: "0 2px 30px rgba(0, 0, 0, 0.1)",
        }}
        // items={sortingItems}
      >
        {renderMenuItems(sortingItems)}
        {renderMenuItems(categoryItems)}
      </Menu>
    </Sider>
  );
}
