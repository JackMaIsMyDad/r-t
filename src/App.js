import React, { Component } from "react";
import {
  DownOutlined,
  PoweroffOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getUserInfo, userLogout } from "./store/modules/user";
import "./App.scss";
import { Layout, Menu, Avatar, Dropdown, Modal } from "antd";
import SiderMenu from "./view/siderMenu";
import { asyncRoutes } from "./router";
import UserInfo from "./view/user";

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      infoVisible: false
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  showPromiseConfirm = () => {
    Modal.confirm({
      title: "Notice",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you wanna log out?",
      onOk: () => {
        return this.props.logout();
      },
      onCancel: () => {}
    });
  };

  handleDropdownMenuClick = ({ key }) => {
    switch (key) {
      case "0":
        this.showPromiseConfirm();
        break;
      case "1":
        this.setState({ collapsed: false, infoVisible: true });
        break;
      default:
        break;
    }
  };

  // this is dropdownMenu
  dropdownMenu = () => {
    return (
      <Menu onClick={this.handleDropdownMenuClick}>
        <Menu.Item key="1">User Info</Menu.Item>
        <Menu.Item key="2">Modify Password</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="0" danger icon={<PoweroffOutlined />}>
          Log out
        </Menu.Item>
      </Menu>
    );
  };

  componentDidMount() {
    console.log("app mount");
    if (this.props.token) {
      this.props
        .getInfo()
        .then(() => {
          console.log(this.props);
          // If you can successfully get user information, go to protal page. if not. go to login page
          this.props.history.push("/layout/portal");
        })
        .catch(() => {
          this.props.history.push("/login");
        });
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className="container">
        <Layout style={{ minHeight: "100vh" }}>
          <SiderMenu {...this.props}></SiderMenu>
          <Layout className="site_layout">
            <Header className="layout_header">
              <Dropdown
                overlay={this.dropdownMenu}
                trigger={["click"]}
                placement="bottomLeft"
              >
                <div style={{ display: "inline-block" }}>
                  <Avatar
                    src={this.props.userInfo ? this.props.userInfo.avatar : ""}
                  ></Avatar>
                  <a
                    style={{ display: "inline-block" }}
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                    href="/"
                  >
                    {this.props.userInfo
                      ? this.props.userInfo.user_nick_name
                      : ""}
                  </a>
                  <DownOutlined style={{ marginLeft: "5px" }} />
                </div>
              </Dropdown>
            </Header>
            <Content className="layout_content">
              <Switch>
                {asyncRoutes.map((value, index) => {
                  return (
                    <Route
                      exact
                      key={index}
                      path={value.path}
                      render={(props) => {
                        return <value.component {...props} />;
                      }}
                    ></Route>
                  );
                })}
              </Switch>
            </Content>
            <Footer className="layout_footer">
              © 2019 Report-Platform designed by Big-Data Teams
            </Footer>
          </Layout>
        </Layout>
        <UserInfo
          visible={this.state.infoVisible}
          setVisible={(value) => {
            this.setState({ collapsed: false, infoVisible: value });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.get("user").get("token"),
    userInfo: state.get("user").get("userInfo")
  };
};

const mapDispatchToProps = (dispatch) => ({
  getInfo() {
    return dispatch(getUserInfo());
  },
  logout() {
    return dispatch(userLogout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
