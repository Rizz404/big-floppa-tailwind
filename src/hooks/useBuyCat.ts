import { useContext } from "react";
import { BuyCatContext } from "../context/BuyCatContext";

const useBuyCat = () => {
  const context = useContext(BuyCatContext);

  if (!context) {
    throw new Error("useBuyCat harus digunakan di dalam BuyCatProvider");
  }
  return context;
};
export default useBuyCat;
