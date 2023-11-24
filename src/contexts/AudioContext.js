import React, { createContext, useContext } from 'react';
import { Synth, Transport } from 'tone';

// Contextを作成
const AudioContext = createContext();

// Providerコンポーネントを作成
export function AudioProvider({ children }) {
  const synth = new Synth().toDestination();

  return (
    <AudioContext.Provider value={{ synth, Transport }}>
      {children}
    </AudioContext.Provider>
  );
}

// カスタムフックを作成
export function useAudio() {
  return useContext(AudioContext);
}