import React, { Component } from "react";
import { Drawer, Avatar, Col, Row } from "antd";
import { connect } from "react-redux";
import "./index.scss";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.status = {
      visible: false
    };
  }

  componentDidMount() {
    console.log("info", this.props);
  }

  onClose = () => {
    this.props.setVisible(false);
  };

  render() {
    return (
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={this.onClose}
        visible={this.props.visible}
      >
        <p
          className="site-description-item-profile-p"
          style={{ marginBottom: 24, fontWeight: "bold" }}
        >
          User Profile
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Avatar"
              content={<Avatar src={this.props.userInfo?.avatar} />}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="User Name"
              content={this.props.userInfo?.user_name}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Email"
              content={this.props.userInfo?.user_email}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Mobile"
              content={this.props.userInfo?.mobile}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="NickName"
              content={this.props.userInfo?.user_nick_name}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Sex"
              content={
                this.props.userInfo?.sex === 0 ? "secret" : 1 ? "boy" : "girl"
              }
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Is Admin"
              content={this.props.userInfo?.is_admin === 0 ? "no" : "yes"}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Remark"
              content={this.props.userInfo?.remark}
            />
          </Col>
        </Row>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.get("user").get("userInfo")
});

export default connect(mapStateToProps)(UserInfo);
