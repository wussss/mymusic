## taro-music

> 基于 Taro 与网易云音乐 api 开发，技术栈主要是：typescript+taro+redux+react-hooks,主要是通过实战强化自身对上述技能的掌握

<hr />

#### 注意事项

**目前已将`taro`的版本升级到最新版本`3.0.15`,确保你本地的`taro-cli`的版本也是这个版本，可以通过`taro info`查看版本号，如果不是最新的话，可以通过执行`taro update self`(`mac`或者`linux`前面需要加上`sudo`)以及`taro update project`进行`cli`与项目依赖的更新保持一致，否则将会导致项目无法正常运行，了解更多详情可查看[Taro 环境及依赖检测](http://taro-docs.jd.com/taro/docs/GETTING-STARTED.html#%E7%8E%AF%E5%A2%83%E5%8F%8A%E4%BE%9D%E8%B5%96%E6%A3%80%E6%B5%8B)**

**首先需要在 src 目录下创建一个`config.ts`**,这样可以根据自己的需要将其替换成线上地址，接口服务是使用的[NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi/#/)

```
export const baseUrl: string = 'http://localhost:3000' // 这里配置的这个url是后端服务的请求地址，示例中代表在本地启用的服务端口是3000，如果希望在真机上调试，可以将地址改为电脑WiFi的IP地址，如10.180.6.XX

```

### 功能列表

- [x] 发现页（主页）

- [x] banner 展示
- [x] 独家/广告

- [x] 推荐歌单展示
- [x] 跳转到歌单详情页
- [x] 跳转到歌曲播放页
- [x] 背景毛玻璃效果
- [x] 导航栏展示歌曲名
- [x] 模拟光盘效果
- [x] 歌曲播放/暂停
- [x] 其它：Loading、无版权退回上一页
- [x] 展示我的信息
- [x] 出生日期格式化为星座等信息
- [x] 展示我创建的歌单
- [x] 跳转到歌单详情页，跳转到歌曲播放页
- [x] 登录
- [x] 退出登录

### 目录结构

> 这里主要介绍下`src`目录，因为开发主要是在这个目录下进行的

src

- actions `redux`中的相关异步操作在这里进行

- constants 项目中的常量定义

- hooks 自定义 hooks 函数

- pages 页面业务逻辑

- reducers `redux`中的相关同步操作在这里定义，action 如何改变 state 树

- services 定义 api

- store redux 的初始文件

- utils 自定义通用方法

- app.config.ts 入口配置文件

- app.scss 入口样式文件

- app.tsx 入口文件
