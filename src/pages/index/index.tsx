/* eslint-disable jsx-quotes */
import React from "react";
import Taro from "@tarojs/taro";
import { Text, View, Button } from "@tarojs/components";
import classnames from "classnames";
import "../../statics/iconfont/iconfont.scss";
import "./index.scss";

const Index: Taro.FC = () => {
  const isVisible = false;
  return (
    <View
      className={classnames({
        index_container: true,
        visible: !!isVisible,
      })}
    >
      <Text>暂无数据</Text>
      <View className="switch-tab">
        <View className="tab">
          <Button className="tab-button">发现</Button>
        </View>
        <View className="tab">
          <Button className="tab-button">我的</Button>
        </View>
      </View>
    </View>
  );
};

export default Index;
