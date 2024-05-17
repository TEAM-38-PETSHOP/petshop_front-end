import { useEffect, useState } from "react";

export default function useIsCurrentScreenSize(
  screenSize: number
)  {
  const [isCurrentSize, setIsCurrentSize] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCurrentSize(window.innerWidth <= screenSize);
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  return isCurrentSize;
}