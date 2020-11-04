/* eslint-disable jsx-quotes */
import React from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { formatCount } from "../../utils/formatCount";
import "../../statics/iconfont/iconfont.scss";
import "./index.scss";

interface IProps {
  name: string;
  src: string;
  count: number;
}
export const PlayList: Taro.FC<IProps> = (props) => {
  const { name, src, count } = props;
  return (
    <View className="square">
      <Image src={src} />
      <View className="iconfont icon-icon- play">{formatCount(count)}</View>
      <View className="name">{name}</View>
    </View>
  );
};
