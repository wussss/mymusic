import { Get_Recommend_List, Get_Banners } from "../constants/playlist";
import { IDefaultState } from "../constants/IDefaultState";

const defaultState: IDefaultState = {
  recommendPlayList: [],
  banners: [],
};
export const home_reducer = (prevState = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Get_Recommend_List:
      const { recommendPlayList } = payload;
      return { ...prevState, recommendPlayList };
    case Get_Banners:
      const { banners } = payload;
      return { ...prevState, banners };
    default:
      return prevState;
  }
};
