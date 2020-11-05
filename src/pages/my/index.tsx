/* eslint-disable jsx-quotes */
import React from "react";
import Taro, { redirectTo } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { Login } from "../../components/login/index";
import "../../statics/iconfont/iconfont.scss";
import "./index.scss";

interface StateProps {}
interface DispatchProps {}
type IProps = StateProps & DispatchProps;

const MyPage: Taro.FC = () => {
  const switchTab = () => {
    redirectTo({ url: "../index/index" });
  };
  return (
    <View className="mypage">
      <Login />
      <View>这是我的主页，但是你需要先登录</View>
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
export default MyPage;
