/* eslint-disable jsx-quotes */
import React, { useEffect } from "react";
import Taro from "@tarojs/taro";
import {
  View,
  Button,
  Text,
  Swiper,
  SwiperItem,
  Input,
} from "@tarojs/components";
import classnames from "classnames";
import { connect } from "react-redux";
import "../../statics/iconfont/iconfont.scss";
import "./index.scss";
import { PlayList } from "../../components/playlist/index";
import { Banner } from "../../components/banner/index";
import { getRecommendPlayList, getBanner } from "../../actions/home_action"; //1、定义组件自己的异步方法
import api from "../../services/api";

interface StateProps {
  recommendPlayList: Array<{
    id: number;
    name: string;
    picUrl: string;
    playCount: number;
  }>;
  banners: Array<{
    pic: string;
    url: string;
    bannerId: string;
    titleColor: string;
    typeTitle: string;
  }>;
}
interface DispatchProps {
  getBanner: () => any;
  getRecommendPlayList: () => any;
} //store.dispatch
type IProps = StateProps & DispatchProps;

const Index: Taro.FC<IProps> = (props) => {
  const recommendPlayList = props.recommendPlayList; //2、定义组件自己的数据，名字自定义，不用和props里的一样
  const banners = props.banners;
  const renderPage = () => {
    props.getBanner();
    props.getRecommendPlayList();
  };
  const isVisible = false;
  // const onApi = () => {
  //   api.get("/banner", { type: 2 }).then((res) => {
  //     console.log(res.data.banners);
  //   });
  // };//测试拿到的数据类型
  useEffect(renderPage, []);
  return (
    <View
      className={classnames({
        index_container: true,
        visible: !!isVisible,
      })}
    >
      <View className="search iconfont icon-search">
        <Input placeholder="搜索"></Input>
      </View>
      <Swiper
        className="banner"
        indicatorColor="#999"
        indicatorActiveColor="#d43c33"
        easingFunction="easeInOutCubic"
        indicatorDots
        autoplay
        circular
      >
        {banners.map((item) => (
          <SwiperItem key={item.bannerId}>
            <Banner
              pic={item.pic}
              typeTitle={item.typeTitle}
              titleColor={item.titleColor}
            />
          </SwiperItem>
        ))}
      </Swiper>
      <View className="daily_list">
        <View className="iconfont icon-tuijian">
          <Text className="icon_text">每日推荐</Text>
        </View>
        <View className="iconfont icon-gedan">
          <Text className="icon_text">歌单广场</Text>
        </View>
        <View className="iconfont icon-gongnengpaihangbang">
          <Text className="icon_text">排行榜</Text>
        </View>
      </View>
      <View className="line_between">{/*画一条分隔线*/}</View>
      <View className="recommend_playlist">
        <View className="recommend_playlist_title">推荐歌单</View>
        <View className="recommend_playlist_content">
          {recommendPlayList?.map((item) => (
            <View key={item.id}>
              <PlayList
                count={item.playCount}
                src={item.picUrl}
                name={item.name}
              />
            </View>
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
  recommendPlayList: state.home_reducer.recommendPlayList, //props.recommendPlayList=state.playlist.recommendPlayList
  banners: state.home_reducer.banners,
});
const mapDispatchToProps = (dispatch) => ({
  getRecommendPlayList() {
    dispatch(getRecommendPlayList());
  }, //props.getRecommendPlayList=dispatch(getRecommendPlayList());
  getBanner() {
    dispatch(getBanner());
  },
});
//3、父组件传递属性过来的props只有一个store,需要将store自己的方法getState()、dispatch映射成props里的值和方法，这样才能使用xxx=props.xxx的形式
export default connect(mapStateToProps, mapDispatchToProps)(Index);
