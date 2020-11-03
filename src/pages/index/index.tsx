/* eslint-disable jsx-quotes */
import React from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

const Index: Taro.FC = () => {
  return (
    <View className="index">
      <Text>这是我的第一个Taro项目</Text>
    </View>
  );
};

export default Index;
