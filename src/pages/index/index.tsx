/* eslint-disable jsx-quotes */
import React, { useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Button, Image } from "@tarojs/components";
import classnames from "classnames";
import { connect } from "react-redux";
import "../../statics/iconfont/iconfont.scss";
import "./index.scss";
import { getRecommendPlayList } from "../../actions/playlist"; //1、定义组件自己的异步方法

interface StateProps {
  recommendPlayList: Array<{
    id: number;
    name: string;
    picUrl: string;
    playCount: number;
  }>;
}
interface DispatchProps {
  getRecommendPlayList: () => any;
} //store.dispatch
type IProps = StateProps & DispatchProps;

const Index: Taro.FC<IProps> = (props) => {
  const recommendPlayList = props.recommendPlayList; //2、定义组件自己的数据，名字自定义，不用和props里的一样
  const renderPage = () => {
    props.getRecommendPlayList();
  };
  const isVisible = false;
  useEffect(renderPage, [recommendPlayList]);
  return (
    <View
      className={classnames({
        index_container: true,
        visible: !!isVisible,
      })}
    >
      <View className="search">搜索</View>
      <View className="recommend_playlist">
        <View className="recommend_playlist_title">推荐歌单</View>
        <View className="recommend_playlist_content">
          {recommendPlayList?.map((item) => (
            <Image key={item.id} src={item.picUrl}></Image>
          ))}
        </View>
      </View>
      <View className="switch-tab">
        <View className="tab">
          <Button className="tab-button" style={{ color: "#d43c33" }}>
            发现
          </Button>
        </View>
        <View className="tab">
          <Button className="tab-button">我的</Button>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  recommendPlayList: state.playlist.recommendPlayList, //props.recommendPlayList=state.playlist.recommendPlayList
});
const mapDispatchToProps = (dispatch) => ({
  getRecommendPlayList() {
    dispatch(getRecommendPlayList());
  }, //props.getRecommendPlayList=dispatch(getRecommendPlayList());
});
//3、父组件传递属性过来的props只有一个store,需要将store自己的方法getState()、dispatch映射成props里的值和方法，这样才能使用xxx=props.xxx的形式
export default connect(mapStateToProps, mapDispatchToProps)(Index);
