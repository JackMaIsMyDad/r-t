import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { asyncRoutes } from "../../router";

const { Sider } = Layout;

class SiderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        collapsible
        theme="light"
        trigger={null}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo_box"></div>
        <Menu
          theme="light"
          defaultSelectedKeys={["0"]}
          mode="inline"
          className="menu_box"
          style={{ minHeight: "100vh" }}
        >
          {asyncRoutes.map((route, index) => {
            return (
              <Menu.Item
                key={index}
                onClick={() => this.props.history.push(route.path)}
                icon={route.icon}
              >
                {route.name}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}

export default SiderMenu;
