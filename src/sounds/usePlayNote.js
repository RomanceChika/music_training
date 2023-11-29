import { useCallback } from "react";
import { useAudio } from "../contexts/AudioContext";
import { useSound } from "../contexts/SoundContext";
import * as Tone from "tone";

/**
 * usePlayNoteは、音を再生するための関数です
 * @returns {Function} playNote - 音を再生する関数。
 * playNoteは以下のパラメータを取ります：
 * @param {(string|string[])} note - 再生する音の名前（例："C4"）または音の名前の配列（例：["C4", "E4"]）。
 * @param {string} duration - 音の持続時間（デフォルト："8n"）。
 * @param {string} time - 音を再生する時間（デフォルト："+0"）。
 */
function usePlayNote() {
  const { synth, Transport } = useAudio();
  const { isSoundOn } = useSound();

  // playNote関数を定義します。
  // この関数は、指定された音を指定された時間に再生します。
  const playNote = useCallback(
    async (note, duration = "8n", time = `+${0.1}`) => {
      if (isSoundOn && note) {
        Transport.scheduleOnce((time) => {
          synth.triggerAttackRelease(note, duration);
        }, time);
      }
    },
    [synth, isSoundOn, Transport]
  );

  // Transportを開始します。
  Transport.start();

  return playNote;
}

export default usePlayNote;
