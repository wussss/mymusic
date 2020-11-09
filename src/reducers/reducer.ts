import {
  Get_Recommend_List,
  Get_Banners,
  Get_PlayList_Datail,
  Clear_PlayList_Datail,
  Get_Song_Deatil,
  Clear_Song_Detail,
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
  song: {
    name: "",
    ar: [],
    al: {
      name: "",
      picUrl: "",
    },
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
      let { playlist } = payload;
      return { ...prevState, playlist };
    case Clear_PlayList_Datail:
      playlist = payload;
      return { ...prevState, playlist };
    case Get_Song_Deatil:
      let { song } = payload;
      return { ...prevState, song };
    case Clear_Song_Detail:
      song = {};
      return { ...prevState, song };
    default:
      return prevState;
  }
};
