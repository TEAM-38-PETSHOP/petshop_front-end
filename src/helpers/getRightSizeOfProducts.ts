import { useEffect, useState } from "react";

export default function useGetRightSizeOfProducts() {
  const [size, setSize] = useState<number | string>(20);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 435) {
        setSize(8);
      } else if (window.innerWidth <= 690) {
        setSize(10);
      } else if (window.innerWidth <= 950) {
        setSize(20);
      } else {
        setSize('');
      }
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}