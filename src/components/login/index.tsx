/* eslint-disable jsx-quotes */
import React from "react";
import Taro from "@tarojs/taro";
import { View, Button, Input } from "@tarojs/components";
import useInputEvent from "../../hooks/useInputEvent";
import useToggle from "../../hooks/useToggle";
import "./index.scss";

interface IProps {
  onLogin: (phone, password) => void;
  setLogin: (isLogin: boolean) => void;
}
const Login: Taro.FC<IProps> = (props) => {
  const { inputValue: phone, onInputEvent: onpPhone } = useInputEvent("");
  const { inputValue: password, onInputEvent: onPassword } = useInputEvent("");
  const { flag, toggleFlag } = useToggle(false);
  const onSubmit = () => {
    if (phone.length === 0) {
      Taro.showToast({ title: "请输入手机号", icon: "none" });
    } else if (password.length === 0) {
      Taro.showToast({ title: "请输入密码", icon: "none" });
    } else if (phone.length !== 11) {
      Taro.showToast({ title: "请输入正确的手机号", icon: "none" });
    } else {
      props.onLogin(phone, password);
      props.setLogin(true)
    }
  }; //内容非空校验
  const onCancel = () => {
    Taro.redirectTo({ url: "../index/index" });
  };
  return (
    <View className="modal">
      <View className="login">
        <View className="title">网易云音乐</View>
        <View className="input_list">
          <View className="input_item iconfont icon-Profile">
            <Input
              placeholder="请输入手机号"
              value={phone}
              onInput={onpPhone}
            />
          </View>
          <View className="input_item iconfont icon-mima">
            <Input
              password={!flag}
              placeholder="请输入密码"
              value={password}
              onInput={onPassword}
            />
            <View onClick={toggleFlag}>
              {flag ? (
                <View className="iconfont icon-zhengyan" />
              ) : (
                <View className="iconfont icon-biyan" />
              )}
            </View>
          </View>
        </View>
        <View className="button_list">
          <Button className="cancel" size="mini" onClick={onCancel}>
            取消
          </Button>
          <Button className="confirm" size="mini" onClick={onSubmit}>
            确认
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Login
