export interface IDefaultState {
  recommendPlayList: Array<{}>; // 推荐歌单
  banners: Array<{}>; //首页banners
  playlist: playListDetailInfoType;
}
export interface currentSongInfoType {
  id: number;
  name: string;
}
export interface MusicItemType {
  name: string;
  id: number;
  ar: Array<{
    name: string;
  }>;
  al: {
    name: string;
  };
  song: {
    id: number;
  };
  copyright: number;
  st?: number;
  current?: boolean;
}

export interface playListDetailInfoType {
  coverImgUrl: string; //封面
  name: string; //标题
  description?: string; //描述
  tags: Array<string | undefined>; //标签
  creator: {
    //创建者
    avatarUrl: string;
    nickname: string;
  };
  tracks: Array<MusicItemType>; //部分歌曲，未登录时
  trackIds: Array<MusicItemType>; //所有歌曲，登录时
  playCount:number;
}
