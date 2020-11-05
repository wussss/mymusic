/* eslint-disable jsx-quotes */
import React from "react";
import Taro from "@tarojs/taro";
import { View, Button, Text, Input } from "@tarojs/components";
import "./index.scss";

export const Login: Taro.FC = () => {
  return (
    <View className="modal">
      <View className="login">
        <View className="title">网易云音乐</View>
        <View className="input_list">
          <Input className="input_item" placeholder="请输入手机号"></Input>
          <Input className="input_item" placeholder="密码" password></Input>
        </View>
        <View className="button_list">
          <Button className="button_list">确认</Button>
          <Button className="button_list">取消</Button>
        </View>
      </View>
    </View>
  );
};
