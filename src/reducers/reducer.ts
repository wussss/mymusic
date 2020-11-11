import {
  Get_Recommend_List,
  Get_Banners,
  Get_PlayList_Datail,
  Clear_PlayList_Datail,
  Get_Song_Deatil,
  Clear_Song_Detail,
  Get_My_Info,
  Get_My_PlayList,
  Login,
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
  myInfo: {
    userPoint: {
      userId: 0,
    },
    profile: {
      gender: 0,
      avatarUrl: "",
      nickname: "",
      birthday: 0,
      backgroundUrl: "",
      defaultAvatar: false,
      signature: "",
      followeds: 0,
      follows: 0,
      playlistCount: 0,
    },
  },
  myPlayList: [],
  userId: 0,
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
    case Get_My_Info:
      let { myInfo } = payload;
      return { ...prevState, myInfo };
    case Get_My_PlayList:
      let { myPlayList } = payload;
      return { ...prevState, myPlayList };
    case Login:
      let { userId } = payload;
      return { ...prevState, userId };
    default:
      return prevState;
  }
};
