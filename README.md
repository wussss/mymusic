基于 Taro 与网易云音乐 api 开发，技术栈主要是：typescript+taro+redux+react-hooks,主要是通过实战强化自身对上述技能的掌握

功能目录

1 首页

2 banner 展示

2.1 独家/广告

2.2  跳转到 banner 详情页

3 推荐歌单

3.1 歌单详情页

3.2 播放音频
3.2.1 背景毛玻璃效果
3.2.2 导航栏展示歌曲名
3.3.3 模拟光盘效果
3.3.4 歌曲播放/暂停、进度条
4.3.5 其它：Loading、无版权退回上一页

4 搜索

# 我的页面

## 登录

## 注册

## 修改个人信息




目录结构

# config

# src

## actions `redux`中的相关异步操作在这里进行

## constants 项目中的常量定义

## hooks 自定义 hooks 函数

## pages 页面业务逻辑

## reducers `redux`中的相关同步操作在这里定义，action 如何改变 state 树

## services 定义 api

## store redux 的初始文件

## utils 自定义通用方法

## app.config.ts 入口配置文件

## app.scss 入口样式文件

## app.tsx 入口文件

## index.html 入口 html 页面

# .editorconfig

# .eslintrc.js

# .gitignore

# babel.config.ts

# global.d.ts

# package.json 项目的依赖文件

# project.config.json 小程序的配置文件

# tsconfig.json

# yarn-error.log
