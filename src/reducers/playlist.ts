import { Get_Recommend_List } from "../constants/playlist";
import { IDefaultState } from "../constants/IDefaultState";

const defaultState: IDefaultState = {
  recommendPlayList: [],
};
export const playlist = (prevState = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Get_Recommend_List:
      const { recommendPlayList } = payload;
      return { ...prevState, recommendPlayList };
    default:
      return prevState;
  }
};
