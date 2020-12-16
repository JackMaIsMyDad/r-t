import Loadable from "react-loadable";
import { Spin } from "antd";

const loadableComponent = (component) =>
  Loadable({
    loader: component,
    loading() {
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spin size="large" />
        </div>
      );
    }
  });

export default loadableComponent;
