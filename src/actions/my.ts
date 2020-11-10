import api from "../services/api";
import { Get_My_Info, Get_My_PlayList } from "../constants/action_type";

export const getMyInfo = () => {
  return (dispatch) => {
    api
      .get("/login/cellphone", { phone: 15626211584, password: "emily1997" })
      .then((res) => {
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
