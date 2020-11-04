//异步actions

import api from "../services/api";
import { Get_Recommend_List } from "../constants/playlist";

export const getRecommendPlayList = () => {
  return (dispatch) => {
    api.get("/personalized").then((res) => {
      let recommendPlayList: [] = res.data.result;
      const action = {
        type: Get_Recommend_List,
        payload: { recommendPlayList },
      };
      dispatch(action);
    });
  };
};
