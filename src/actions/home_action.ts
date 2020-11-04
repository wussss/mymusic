//异步actions

import api from "../services/api";
import { Get_Recommend_List, Get_Banners } from "../constants/playlist";

export const getRecommendPlayList = () => {
  return (dispatch) => {
    api.get("/personalized", { limit: 15 }).then((res) => {
      let recommendPlayList: [] = res.data.result;
      const action = {
        type: Get_Recommend_List,
        payload: { recommendPlayList },
      };
      dispatch(action);
    });
  };
};

export const getBanner = () => {
  return (dispatch) => {
    api.get("/banner", { type: 2 }).then((res) => {
      let banners: [] = res.data.banners;
      const action = {
        type: Get_Banners,
        payload: { banners },
      };
      dispatch(action);
    });
  };
};
