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
      console.log(res.data);
      Taro.showModal({
        title: "提示",
        content: "暂无版权，是否返回歌单详情页?",
        success: function (result) {
          if (result.confirm) {
            Taro.navigateBack({ delta: 1 });
          } else if (result.cancel) {
            console.log('取消')
          }
        },
      });
    }
  });
}; //检查音乐是否有版权
let audioContext = Taro.createInnerAudioContext();
const SongDetail: Taro.FC<IProps> = (props) => {
  const { id } = Taro.getCurrentInstance()?.router?.params || {};
  const newId = Number(id || 0);
  const { name, al } = props.song;
  const [isPlaying, setPlaying] = useState(false);
  const onChangePlayStatus = () => {
    if (audioContext.paused) {
      setPlaying(!isPlaying);
      audioContext.play();
      console.log("播放");
    } else {
      setPlaying(!isPlaying);
      audioContext.stop();
      console.log("停止");
    }
  };
  useEffect(() => {
    checkSong(newId);
  }, [newId]); //检查是否有版权,没有则不挂载页面
  useEffect(() => {
    audioContext = Taro.createInnerAudioContext();
  }, []); //创建InnerAudioContext
  useEffect(() => {
    Taro.showLoading({
      title: "Loading",
    });
    setTimeout(function () {
      Taro.hideLoading();
    }, 2000);
  }, []); //Loading
  audioContext.src = `https://music.163.com/song/media/outer/url?id=${newId}.mp3`;
  audioContext.onError((res) => {
    console.log(res);
  });
  useEffect(() => {
    props.getSongDetail(newId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newId]); //更新页面
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: name ? name : "加载中",
    });
  }, [name]); //更新导航栏
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
