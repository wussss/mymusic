/* eslint-disable jsx-quotes */
import React, { useEffect } from "react";
import Taro from "@tarojs/taro";
import { useWillUnmount } from "use-lifecycle";
import { View } from "@tarojs/components";
import { connect } from "react-redux";
import {
  getPlayListDetail,
  clearPlayListDetail,
} from "../../actions/playlist_detail";
import { playListDetailInfoType } from "../../constants/commonType";
import { PlayList } from "../../components/playlist";
import { Song } from "../../components/song";
import "../../statics/iconfont/iconfont.scss";
import "./index.scss";

interface StateProps {
  playlist: playListDetailInfoType;
}
interface DispatchProps {
  getPlayListDetail: (id: number) => any;
  clearPlayListDetail: () => { type: string; payload: {} };
} //store.dispatch
type IProps = StateProps & DispatchProps;

const PlayListDetail: Taro.FC<IProps> = (props) => {
  const { id } = Taro.getCurrentInstance()?.router?.params || {};
  const newId = Number(id || 0);
  const renderPage = () => {
    props.getPlayListDetail(newId);
  };
  // useWillUnmount(() => {
  //   props.clearPlayListDetail();
  //   console.log("store will be clear");
  // }); //页面卸载时
  useEffect(renderPage, [id]);
  const {
    coverImgUrl,
    name,
    description,
    tags,
    creator: { avatarUrl, nickname },
    tracks,
    playCount,
  } = props.playlist;
  return (
    <View className="playlist-detail">
      <View
        className="background_image"
        style={{ background: `url(${coverImgUrl}) center no-repeat` }}
      />
      <View className="playlist_info">
        <View className="header">
          <PlayList src={coverImgUrl} count={playCount} />
          <View className="info">
            <View className="name">{name}</View>
            <View className="creator">
              <View
                className="avatar"
                style={{
                  background: `url(${avatarUrl}) no-repeat`,
                  backgroundSize: "cover",
                }}
              />
              <View>{nickname}</View>
            </View>
            <View className="tags">
              {tags.map((item, index) => (
                <View key={index} className="tag">
                  {item}
                </View>
              ))}
            </View>
          </View>
        </View>
        <View className="description">{description}</View>
      </View>
      <View className="songs">
        {tracks.map((item, index) => (
          <Song
            key={item.id}
            index={index}
            name={item.name}
            ar={item.ar}
            al={item.al}
            copyright={item.copyright}
            mv={item.mv}
          />
        ))}
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  playlist: state.home_reducer.playlist,
});
const mapDispatchToProps = (dispatch) => ({
  getPlayListDetail(id: number) {
    dispatch(getPlayListDetail(id));
  },
  clearPlayListDetail() {
    dispatch(clearPlayListDetail());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PlayListDetail);
