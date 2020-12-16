import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

class AuthorizedRoute extends React.Component {
  // shouldComponentUpdate() {
  // 	return false
  // }

  render() {
    console.log("authorized", this.props);
    const { component: Component, ...rest } = this.props;
    const isLogged = this.props.token ? true : false;
    return (
      <Route
        {...rest}
        render={(props) => {
          return isLogged ? <Component {...props} /> : <Redirect to="/login" />;
        }}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.get("user").get("token")
  };
};

export default connect(mapStateToProps)(AuthorizedRoute);
