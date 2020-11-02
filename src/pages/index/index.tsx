/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import api from "../../services/api";

const Index: Taro.FC = () => {
  const [songs, setSongs] = useState([]);
  const getSong=()=> {
    api
      .get("/artist/top/song", {
        id: 6452,
      })
      .then((data: { data: { songs: [] } }) => {
        setSongs(data.data.songs);
      });
  }
  return (
    <View className="index">
      <Text onClick={() => getSong()}>
        这是我的第一个Taro项目
      </Text>
      {
        songs.map((item:{name}, index) => (
          <View key={index}>{item.name}</View>
        ))}
    </View>
  );
};

export default Index;
