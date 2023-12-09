import React from "react";
import { Notation } from "react-abc";
import * as Tone from "tone";

function IntervalFromSheet() {
  const clef = "clef=treble"; // ト音記号 (Gクリフ)
  // const clef = "clef=bass"; // ヘ音記号 (Fクリフ) に切り替える場合

  const title = "T:Two Whole Notes";
  const notes = "[C8 E8]"; // CとEの全音符

  const abcString = `X:1\n${title}\nK:C ${clef}\n${notes}`;

  // シンセサイザーを作成
  //const synth = new Tone.Synth().toDestination();

  // Cの音を鳴らす
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();

  synth.triggerAttackRelease(["C4", "E4"], "8n");

  return (
    <div>
      <h1>未実装</h1>
      <Notation notation={abcString} />
      <div id="midi-player"></div>
    </div>
  );
}

export default IntervalFromSheet;
