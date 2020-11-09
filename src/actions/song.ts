import api from "../services/api";
import { Get_Song_Deatil, Clear_Song_Detail } from "../constants/action_type";

export const getSongDetail = (songId: number) => {
  return (dispatch) => {
    api.get("/song/detail", { ids: songId }).then((res) => {
      let song = {};
      song = res.data.songs[0] ? res.data.songs[0] : {};
      const action = {
        type: Get_Song_Deatil,
        payload: { song },
      };
      dispatch(action);
    });
  };
};
export const clearSongDetail = () => {
  const action = {
    type: Clear_Song_Detail,
    payload: {},
  };
  return action;
};
