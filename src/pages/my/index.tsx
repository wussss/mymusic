/* eslint-disable jsx-quotes */
import React, { useEffect, useState } from "react";
import Taro, { redirectTo } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "react-redux";
import { Login } from "../../components/login/index";
import { PersonalInfoType } from "../../constants/commonType";
import { getMyInfo, getMyPlayList } from "../../actions/my";
import { formatDate } from "../../utils/formatDate";
import "../../statics/iconfont/iconfont.scss";
import "./index.scss";

interface StateProps {
  myInfo: PersonalInfoType;
  myPlayList: Array<{
    id: number;
    name: string;
    coverImgUrl: string;
    playCount: number;
    trackCount: number;
  }>;
}
interface DispatchProps {
  getMyInfo: () => void;
  getMyPlayList: (uid: number) => void;
}
type IProps = StateProps & DispatchProps;
const MyPage: Taro.FC<IProps> = (props) => {
  const switchTab = () => {
    redirectTo({ url: "../index/index" });
  };
  const [isLogin] = useState(true);
  const { account, profile } = props.myInfo;
  const myPlayList = props.myPlayList || [];
  const getDetail = (id: number) => {
    Taro.navigateTo({
      url: `../playlistdetail/index?id=${id}`,
    });
  };
  useEffect(() => {
    props.getMyInfo();
    props.getMyPlayList(account.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View className="mypage">
      {!isLogin && (
        <View className="Login">
          <Login />
        </View>
      )}
      {!account ? (
        "Loading"
      ) : (
        <View className="profile">
          <View
            className="background_image"
            style={{
              background: `url(${profile.backgroundUrl}) center no-repeat`,
              backgroundSize: "cover",
            }}
          />
          <View className="info">
            <View
              className="avatar"
              style={{
                background: `url(${profile.avatarUrl}) center no-repeat`,
                backgroundSize: "cover",
              }}
            />
            <View className="nickname">{profile.nickname}</View>
            <View className="follow">
              <View className="follows">{`关注 ${profile.follows}`}</View>
              <View className="followed">{`粉丝 ${profile.followeds}`}</View>
            </View>
            <View className="mygender">
              <View className="age tag">
                {profile.gender === 2 ? (
                  <View className="iconfont icon-nv"></View>
                ) : (
                  <View className="iconfont icon-nan"></View>
                )}
                <View>{formatDate(profile.birthday).str}</View>
              </View>
              <View className="xingzuo tag">
                {formatDate(profile.birthday).str1}
              </View>
            </View>
            <View className="signature">个人签名:{profile.signature}</View>
          </View>
          <View className="playlists">
            <View className="title">{`创建的歌单(${
              profile.playlistCount - 1
            })`}</View>
            {myPlayList?.slice(0, profile.playlistCount).map((item) => (
              <View
                className="playlist"
                key={item.id}
                onClick={() => {
                  getDetail(item.id);
                }}
              >
                <View
                  className="cover"
                  style={{
                    background: `url(${item.coverImgUrl}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                />
                <View className="playlist_info">
                  <View className="name">
                    <Text>{item.name}</Text>
                  </View>
                  <View className="trackCount">{`${item.trackCount}首,播放${item.playCount}次`}</View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
      <View className="switch-tab">
        <View className="tab">
          <Button onClick={switchTab} className="tab-button">
            发现
          </Button>
        </View>
        <View className="tab">
          <Button className="tab-button" style={{ color: "#d43c33" }}>
            我的
          </Button>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  myInfo: state.home_reducer.myInfo,
  myPlayList: state.home_reducer.myPlayList,
});
const mapDispatchToProps = (dispatch) => ({
  getMyInfo() {
    dispatch(getMyInfo());
  },
  getMyPlayList(uid: number) {
    dispatch(getMyPlayList(uid));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
