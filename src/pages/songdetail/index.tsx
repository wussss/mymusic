/* eslint-disable jsx-quotes */
import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { useWillUnmount } from "use-lifecycle";
import { View } from "@tarojs/components";
import { connect } from "react-redux";
import classnames from "classnames";
import { MusicItemType } from "../../constants/commonType";
import { getSongDetail, clearSongDetail } from "../../actions/song";
import api from "../../services/api";
import disk from "../../statics/images/disk.png";
import disk1 from "../../statics/images/disk1.png";
import "../../statics/iconfont/iconfont.scss";
import "./index.scss";

interface StateProps {
  song: MusicItemType;
}
interface DispatchProps {
  getSongDetail: (songId: number) => void;
  getLyric: (songId: number) => void; //获取单词
  clearSongDetail: () => void;
}
type IProps = StateProps & DispatchProps;
const checkSong = (songId: number) => {
  api.get("/check/music", { id: songId }).then((res) => {
    if (res.data.success === false) {
      Taro.showToast({
        title: "暂无版权",
        icon: "none",
      });
    }
  });
}; //检查音乐是否有版权
const audioContext = Taro.createInnerAudioContext();
const SongDetail: Taro.FC<IProps> = (props) => {
  const { id } = Taro.getCurrentInstance()?.router?.params || {};
  const newId = Number(id || 0);
  audioContext.src = `https://music.163.com/song/media/outer/url?id=${newId}.mp3`;
  audioContext.onError((res) => {
    console.log(res);
  });
  const { name, al } = props.song;
  const [isPlaying, setPlaying] = useState(false);
  const renderPage = () => {
    props.getSongDetail(newId);
    checkSong(newId);
  };
  const onChangePlayStatus = () => {
    if (audioContext.paused) {
      setPlaying(!isPlaying);
      audioContext.play();
      console.log("播放中", audioContext.paused);
    } else {
      setPlaying(!isPlaying);
      audioContext.stop();
      console.log("暂停", audioContext.paused);
    }
  };
  useEffect(renderPage, [newId]);
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: name ? name : "加载中",
    });
  }, [name]);
  useWillUnmount(() => {
    props.clearSongDetail();
    audioContext.destroy();
    console.log("store will be clear");
  }); //页面卸载时
  return (
    <View className="song">
      {!al ? (
        "Loading"
      ) : (
        <View className="song_container">
          <View
            className="song_bk"
            style={{ background: `url(${al.picUrl})` }}
          />
          <View className="disk_bk">
            <View
              className={classnames({
                icon: true,
                rotate: !isPlaying,
              })}
              style={{
                background: `url(${disk}) no-repeat`,
                backgroundSize: "cover",
              }}
            />
            <View
              className="disk"
              style={{
                background: `url(${disk1}) no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <View
                className={classnames({
                  disk_info: true,
                  rotate: !!isPlaying,
                })}
                style={{
                  background: `url(${al.picUrl}) no-repeat`,
                  backgroundSize: "cover",
                }}
              />
            </View>
          </View>
          <View className="player">
            <View className="iconfont icon-shangyiqu" />
            <View
              className={
                isPlaying
                  ? `iconfont middle icon-ziyuan1 `
                  : `iconfont middle icon-icon-1`
              }
              onClick={onChangePlayStatus}
            />
            <View className="iconfont icon-xiayiqu" />
          </View>
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  song: state.home_reducer.song,
});
const mapDispatchToProps = (dispatch) => ({
  getSongDetail(songId: number) {
    dispatch(getSongDetail(songId));
  },
  clearSongDetail() {
    dispatch(clearSongDetail());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SongDetail);
