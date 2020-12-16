import React from "react";
import { connect } from "react-redux";
import "./index.scss";
import { signIn } from "../../store/modules/user";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.formRef = React.createRef();
  }

  handleOnFinish = (e) => {
    this.setState({ loading: true });
    const loginfo = Object.assign(e);
    if (e.remember) {
      localStorage.setItem("remember", JSON.stringify(loginfo));
    } else {
      localStorage.setItem("remember", false);
    }
    this.props
      .login(loginfo)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push("/layout");
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    const loginInfoStr = localStorage.getItem("remember");
    if (loginInfoStr) {
      this.formRef.current.setFieldsValue(JSON.parse(loginInfoStr));
    }
  }

  render() {
    return (
      <div className="login_container">
        <Form
          ref={this.formRef}
          name="normal_login"
          className="login-form"
          initialvalues={{
            remember: true
          }}
          onFinish={this.handleOnFinish}
        >
          <div className="login_title">Log In</div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!"
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!"
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              loading={this.state.loading}
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  login(loginfo) {
    return dispatch(signIn(loginfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
