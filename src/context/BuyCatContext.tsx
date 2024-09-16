import { createContext, ReactNode, useEffect, useState } from "react";
import { Cat } from "../types/Cat";

interface CatSelected {
  cat: Cat;
  amount: number;
}

interface BuyCatContextProps {
  catSelected: CatSelected | null;
  setCatSelected: (catSelected: CatSelected) => void;
}

export const BuyCatContext = createContext<BuyCatContextProps | undefined>(
  undefined
);

const BuyCatProvider = ({ children }: { children: ReactNode }) => {
  const [catSelected, setCatSelected] = useState<CatSelected | null>(() => {
    const catSelectedFromStorage = localStorage.getItem("catSelected");
    return catSelectedFromStorage ? JSON.parse(catSelectedFromStorage) : null;
  });

  useEffect(() => {
    if (catSelected) {
      localStorage.setItem("catSelected", JSON.stringify(catSelected));
    } else {
      localStorage.removeItem("catSelected");
    }
  }, [catSelected]);

  return (
    <BuyCatContext.Provider value={{ catSelected, setCatSelected }}>
      {children}
    </BuyCatContext.Provider>
  );
};

export default BuyCatProvider;
