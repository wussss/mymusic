export interface IDefaultState {
  recommendPlayList: Array<{}>; // 推荐歌单
  banners: Array<{}>; //首页banners
  playlist: playListDetailInfoType;
  song: MusicItemType;
  myInfo: PersonalInfoType;
  myPlayList: Array<{}>;
  userId:number
}
export interface PersonalInfoType {
  userPoint: {
    userId: number;
  };
  profile: {
    gender: number; //性别
    avatarUrl: string; //头像地址
    nickname: string; //用户名
    birthday: number; //生日
    backgroundUrl: string; //背景图片地址
    defaultAvatar: boolean; //是否默认头像
    signature: string; //签名
    followeds: number; //粉丝数
    follows: number; //关注
    playlistCount; //创建歌单数
  };
}
export interface MusicItemType {
  index?: number;
  name: string; //歌曲名字
  id?: number;
  ar: Array<{
    name: string;
  }>; //artist，演唱者
  al: {
    name: string;
    picUrl: string;
  }; //album,专辑名
  copyright?: number; //版权
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
