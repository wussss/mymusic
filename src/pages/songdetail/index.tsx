/* eslint-disable jsx-quotes */
import React from "react";
import Taro, { navigateTo } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "react-redux";
import {
  getPlayListDetail,
  clearPlayListDetail,
} from "../../actions/playlist_detail";
import { playListDetailInfoType } from "../../constants/commonType";
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

const SongDetail: Taro.FC<IProps> = () => {
  return(<View>这里是歌曲详情</View>)
  
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
export default connect(mapStateToProps, mapDispatchToProps)(SongDetail);
