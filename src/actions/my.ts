import Taro from "@tarojs/taro";
import api from "../services/api";
import { Get_My_Info, Get_My_PlayList, Login } from "../constants/action_type";

export const onLogin = (phone: string, password: string) => {
  return (dispatch) => {
    api
      .get("/login/cellphone", { phone: phone, password: password })
      .then((res) => {
        let userId: number = 0;
        userId = res.data?.account?.id || 0;
        const action = {
          type: Login,
          payload: { userId },
        };
        dispatch(action);
        const str = JSON.stringify(userId);
        Taro.setStorageSync("userId", str);
      });
  };
};
export const getMyInfo = (uid: number) => {
  return (dispatch) => {
    api.get("/user/detail", { uid: uid }).then((res) => {
      let myInfo = {};
      myInfo = res.data;
      const action = {
        type: Get_My_Info,
        payload: { myInfo },
      };
      dispatch(action);
    });
  };
};
export const getMyPlayList = (id: number) => {
  return (dispatch) => {
    api.get("/user/playlist", { uid: id }).then((res) => {
      let myPlayList = {};
      myPlayList = res.data.playlist;
      const action = {
        type: Get_My_PlayList,
        payload: { myPlayList },
      };
      dispatch(action);
    });
  };
};
