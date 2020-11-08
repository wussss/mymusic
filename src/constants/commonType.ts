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
  name: string; //歌曲名字
  id: number;
  ar: Array<{
    name: string;
  }>; //artist，演唱者
  al: {
    name: string;
  }; //album,专辑名
  copyright: number; //版权
  st?: number; //是否喜欢
  current?: boolean; //是否播放中
  mv?: number; //是否有mv
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
  playCount: number;
}
