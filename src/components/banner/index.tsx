/* eslint-disable jsx-quotes */
import React from "react";
import Taro  from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.scss";

interface IProps {
  pic: string;
  typeTitle: string;
  titleColor: string;
}
export const Banner: Taro.FC<IProps> = (props) => {
  const { pic, typeTitle, titleColor } = props;
  return (
    <View className="banner">
      <View className="type_title" style={{ background: titleColor }}>
        {typeTitle}
      </View>
      <Image src={pic} className="banner_image"></Image>
    </View>
  );
};
