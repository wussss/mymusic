import {
  Get_Recommend_List,
  Get_Banners,
  Get_PlayList_Datail,
} from "../constants/action_type";
import { IDefaultState } from "../constants/commonType";

const defaultState: IDefaultState = {
  recommendPlayList: [],
  banners: [],
  playlist: {
    coverImgUrl: "",
    name: "",
    description: "",
    tags: [],
    creator: {
      avatarUrl: "",
      nickname: "",
    },
    tracks: [],
    trackIds: [],
    playCount: 0,
  },
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
    case Get_PlayList_Datail:
      const { playlist } = payload;
      return { ...prevState, playlist };
    default:
      return prevState;
  }
};
