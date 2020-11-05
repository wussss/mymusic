/* eslint-disable jsx-quotes */
import React, { useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { connect } from "react-redux";
import { getPlayListDetail } from "../../actions/playlist_detail";
import { playListDetailInfoType } from "../../constants/commonType";
import "../../statics/iconfont/iconfont.scss";
import "./index.scss";

interface StateProps {
  playlist: playListDetailInfoType;
}
interface DispatchProps {
  getPlayListDetail: (id: number) => any;
} //store.dispatch
type IProps = StateProps & DispatchProps;

const PlayListDetail: Taro.FC<IProps> = (props) => {
  const playlist = props.playlist;
  const { id } = Taro.getCurrentInstance()?.router?.params || {};
  const newId = Number(id || 0);
  const renderPage = () => {
    props.getPlayListDetail(newId);
  };
  useEffect(renderPage, []);
  return (
    <View className="playlist-detail">
      <Text>{playlist.name}</Text>
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
});
//3、父组件传递属性过来的props只有一个store,需要将store自己的方法getState()、dispatch映射成props里的值和方法，这样才能使用xxx=props.xxx的形式
export default connect(mapStateToProps, mapDispatchToProps)(PlayListDetail);
