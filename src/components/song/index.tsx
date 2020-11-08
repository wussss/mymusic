/* eslint-disable jsx-quotes */
import React from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "../../statics/iconfont/iconfont.scss";
import "./index.scss";

interface IProps {
  index: number;
  name: string; //歌曲名字
  ar: Array<{
    name: string;
  }>; //artist，演唱者
  al: {
    name: string;
  }; //album,专辑名
  copyright?: number; //版权
  st?: number; //是否喜欢
  current?: boolean; //是否播放中
  mv: number; //是否有mv
}
export const Song: Taro.FC<IProps> = (props) => {
  const { index, name, ar, al, copyright, mv } = props;
  return (
    <View className="song">
      <View className='info'>
        <View className="xuhao">{index + 1}</View>
        <View className="info1">
          <View>{name}</View>
          <View className="info2">
            {copyright === 0 && <View className="dujia">独家</View>}
            <View className="zhuanji">{`${ar[0].name}-${al.name}`}</View>
          </View>
        </View>
      </View>
      {mv !== 0 && <View className="iconfont icon-shipin mv" />}
    </View>
  );
};
