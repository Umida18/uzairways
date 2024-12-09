import React, { createContext, useContext, useState } from "react";

const FloorContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>] | undefined
>(undefined);

export const useFloor = () => {
  const context = useContext(FloorContext);
  return context;
};

export const FloorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [floor, setFloor] = useState(1);

  return (
    <FloorContext.Provider value={[floor, setFloor]}>
      {children}
    </FloorContext.Provider>
  );
};
