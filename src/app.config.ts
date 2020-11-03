export default {
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#d43c33',
    navigationBarTitleText: '网易云音乐',
    navigationBarTextStyle: 'white'
  },
  requiredBackgroundModes:['audio']//需要在后台使用的能力，仅支持audio、location
}
