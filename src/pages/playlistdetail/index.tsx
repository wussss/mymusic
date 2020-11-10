/* eslint-disable jsx-quotes */
import React, { useEffect } from "react";
import Taro from "@tarojs/taro";
import { useWillUnmount } from "use-lifecycle";
import { View, Text } from "@tarojs/components";
import { connect } from "react-redux";
import {
  getPlayListDetail,
  clearPlayListDetail,
} from "../../actions/playlist_detail";
import {
  playListDetailInfoType,
  MusicItemType,
} from "../../constants/commonType";
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
  //const newId: number = 5002317855; //方便调试
  const renderPage = () => {
    props.getPlayListDetail(newId);
  };
  useEffect(renderPage, [id]);
  useWillUnmount(() => {
    props.clearPlayListDetail();
    console.log("store will be clear");
  }); //页面卸载时
  const onPlay = (item: MusicItemType) => {
    console.log(item.name, item.id);
    Taro.navigateTo({ url: `../songdetail/index?id=${item.id}` });
  };
  const {
    coverImgUrl,
    name,
    description,
    tags,
    creator,
    tracks,
    playCount,
  } = props.playlist;
  return (
    <View>
      {!name ? (
        "Loading"
      ) : (
        <View className="playlist-detail">
          <View
            className="background_image"
            style={{
              background: `url(${coverImgUrl}) center no-repeat`,
              backgroundSize: "cover",
            }}
          />
          <View className="playlist_info">
            <View className="header">
              <PlayList src={coverImgUrl} count={playCount} />
              <View className="info">
                <View className="name">
                  <Text>{name}</Text>
                </View>
                <View className="creator">
                  <View
                    className="avatar"
                    style={{
                      background: `url(${creator.avatarUrl}) no-repeat`,
                      backgroundSize: "cover",
                    }}
                  />
                  <View>{creator.nickname}</View>
                </View>
                {tags && (
                  <View className="tags">
                    {tags.map((item, index) => (
                      <View key={index} className="tag">
                        {item}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
            {description && <View className="description">{description}</View>}
          </View>
          {tracks && (
            <View className="songs">
              {tracks.map((item, index) => (
                <View
                  key={item.id}
                  className="song"
                  onClick={() => {
                    onPlay(item);
                  }}
                >
                  <Song
                    index={index}
                    name={item.name}
                    ar={item.ar}
                    al={item.al}
                    copyright={item.copyright}
                    mv={item.mv || 0}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      )}
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
