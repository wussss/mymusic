// 接收一个initFlag,返回一个flag=initFlag,三个改变flag的方法
import { useCallback, useState } from "react";

export default function useToggle(initFlag: boolean) {
  const [flag, setFlag] = useState(initFlag);
  const toggleFlag = useCallback(() => setFlag(!flag), [flag]);

  return { flag, setFlag, toggleFlag };
}
