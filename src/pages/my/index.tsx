/* eslint-disable jsx-quotes */
import React, { useEffect, useState } from "react";
import Taro, { redirectTo } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "react-redux";
import Login from "../../components/login/index";
import { PersonalInfoType } from "../../constants/commonType";
import { getMyInfo, getMyPlayList, onLogin } from "../../actions/my";
import { formatDate } from "../../utils/formatDate";
import api from "../../services/api";
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
  userId: number;
}
interface DispatchProps {
  getMyInfo: (uid: number) => void;
  getMyPlayList: (uid: number) => void;
  onLogin: (str1, str2) => void;
}
type IProps = StateProps & DispatchProps;

const MyPage: Taro.FC<IProps> = (props) => {
  const switchTab = () => {
    redirectTo({ url: "../index/index" });
  };
  const [isLogin, setLogin] = useState(false);
  const userId = props.userId || Number(Taro.getStorageSync("userId") || 0);
  const LogOut = () => {
    api.get("/logout").then((res) => {
      console.log(res);
      props.onLogin("", "");
      Taro.setStorageSync("userId", "");
      Taro.redirectTo({ url: "../index/index" });
    });
  };
  useEffect(() => {
    props.getMyInfo(userId);
    props.getMyPlayList(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); //页面更新
  const { profile } = props.myInfo;
  const myPlayList = props.myPlayList || [];
  const getDetail = (id: number) => {
    Taro.navigateTo({
      url: `../playlistdetail/index?id=${id}`,
    });
  };

  return (
    <View className="mypage">
      {!isLogin && !userId ? (
        <View className="Login">
          <Login setLogin={setLogin} onLogin={props.onLogin} />
        </View>
      ) : (
        <View>
          {!profile ? (
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
              <View
                onClick={LogOut}
                style={{
                  color: "#c01d19",
                  float: "right",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                退出登录
              </View>
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
  userId: state.home_reducer.userId,
});
const mapDispatchToProps = (dispatch) => ({
  getMyInfo(uid: number) {
    dispatch(getMyInfo(uid));
  },
  getMyPlayList(uid: number) {
    dispatch(getMyPlayList(uid));
  },
  onLogin(str1, str2) {
    dispatch(onLogin(str1, str2));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
