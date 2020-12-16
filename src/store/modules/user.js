import { fromJS } from "immutable";
// import { createHashHistory } from 'history'
import { getToken, removeToken, setToken } from "../../utils/auth";
import { login, logout, userinfo } from "../../api/user";

// const history = createHashHistory()

const userState = fromJS({
  token: getToken(),
  userInfo: null
});

export const user = (state = userState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return state.set("token", action.data);
    case "SET_USERINFO":
      return state.set("userInfo", action.data);
    default:
      return state;
  }
};

const setUserToken = (data) => ({
  type: "SET_TOKEN",
  data
});

const setUserInfo = (data) => ({
  type: "SET_USERINFO",
  data
});

export const signIn = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    login({ username: params.username, password: params.password })
      .then((res) => {
        dispatch(setUserToken(res.data.token));
        setToken(res.data.token);
        dispatch(getUserInfo())
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getUserInfo = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    userinfo()
      .then((resInfo) => {
        dispatch(setUserInfo(resInfo.data));
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export const userLogout = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    logout()
      .then(() => {
        dispatch(setUserToken(""));
        dispatch(setUserInfo(null));
        removeToken();
        resolve();
        // history.push('/login')
      })
      .catch(() => {
        reject();
      });
  });
};
