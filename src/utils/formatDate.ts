export const formatDate = (time: number) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay() + 1;
  let str = "";
  if (year < 1980) {
    str = "70后";
  }
  if (year >= 1980 && year < 1990) {
    str = "80后";
  }
  if (year >= 1990 && year < 1995) {
    str = "90后";
  }
  if (year >= 1995 && year < 2000) {
    str = "95后";
  }
  if (year >= 2000 && year < 2005) {
    str = "00后";
  }
  if (year >= 2005) {
    str = "05后";
  }
  const xingzuo = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
  const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
  let str1 =
    xingzuo.substr(month * 2 - (day - arr[month - 1] ? 2 : 0), 2) + "座";
  return { str, str1 };
}; //日期格式化，时间戳转换为95后等
