export const formatCount = (num: number) => {
  const a = Math.round(num / 100000000);
  const b = Math.round(num / 10000);
  if (a !== 0) return a + "亿";
  if (b !== 0) return b + "万";
  return num;
};
