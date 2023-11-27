import React, { createContext, useContext, useState } from "react";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [isSoundOn, setIsSoundOn] = useState(false);

  return (
    <SoundContext.Provider value={{ isSoundOn, setIsSoundOn }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
