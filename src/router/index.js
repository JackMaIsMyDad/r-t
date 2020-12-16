import {
  AliwangwangOutlined,
  AppleOutlined,
  ZhihuOutlined
} from "@ant-design/icons";
import loadableComponent from "../utils/loadable";

export const asyncRoutes = [
  {
    path: "/layout/portal",
    name: "portal",
    title: "Portal",
    icon: <AliwangwangOutlined />,
    component: loadableComponent(() => import("../view/portal"))
  },
  {
    path: "/layout/snake",
    name: "snake",
    title: "Snake",
    icon: <AppleOutlined />,
    component: loadableComponent(() => import("../view/snake"))
  },
  {
    path: "/layout/pig",
    name: "pig",
    title: "pig",
    icon: <ZhihuOutlined />,
    component: loadableComponent(() => import("../view/pig"))
  }
];
