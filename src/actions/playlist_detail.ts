import api from "../services/api";
import { Get_PlayList_Datail } from "../constants/action_type";

export const getPlayListDetail = (id: number) => {
  console.log(id)
  return (dispatch) => {
    api.get("/playlist/detail", { id }).then((res) => {
      let playlist = res.data.playlist;
      const action = {
        type: Get_PlayList_Datail,
        payload: { playlist },
      };
      dispatch(action);
    });
  };
};
