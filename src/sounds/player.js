import * as Tone from "tone";

class Player {
  constructor() {
    const { synth, Transport } = useAudio();
    const { isSoundOn } = useSound();
    this.isStarted = false;
  }

  async start() {
    if (!this.isStarted) {
      await Tone.start();
      this.isStarted = true;
    }
  }

  playNote(synth, note, duration = "8n", time = `+${0.1}`) {
    if (this.isStarted && note) {
      Tone.Transport.scheduleOnce((time) => {
        synth.triggerAttackRelease(note, duration, time);
      }, time);
    }
  }
}

export default Player;
