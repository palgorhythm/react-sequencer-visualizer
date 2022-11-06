import { CONFIG } from "../config.js";
import * as Tone from "tone";

let part, synth; // define global variables
let sequencerIsRunning = true;
function getCurrentStep() {
  return Math.round((part ? part.progress : 0) * 16);
}

export function toggleSequencer(setCurrentSequenceIndex) {
  // set our synth variable.
  // synthConfig lives in lib/synthConfig.js: check it out and play with some of the values!
  Tone.Transport.start();
  Tone.Transport.bpm.value = 90;
  synth = new Tone.DuoSynth(CONFIG.synth).toDestination();
  if (!part) {
    part = new Tone.Part(
      (time, value) => runSequenceStep(time, value, setCurrentSequenceIndex),
      loopNotes
    );
    part.loop = true;
  }
  if (sequencerIsRunning) {
    console.log("Starting sequence!");
    part.start(0);
    sequencerIsRunning = false;
  } else {
    console.log("Stopping sequence.");
    part.stop();
    sequencerIsRunning = true;
  }
}

let timeoutId;
window.addEventListener(
  "resize",
  function (event) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(onResizeFinish, 200);
    Tone.Transport.pause();
  },
  true
);

function onResizeFinish() {
  Tone.Transport.start();
}

// SECTION 2: SETUP OUR LOOP!

const loopNotes = [
  // time is in Bars:Beats:Sixteenths
  { time: "0:0:0", note: "C2", velocity: 1.0 },
  { time: "0:0:1", note: "E4", velocity: 0.6 },
  { time: "0:0:2", note: "G4", velocity: 0.7 },
  { time: "0:0:3", note: "B4", velocity: 0.8 },
  { time: "0:0:4", note: "D5", velocity: 0.9 },
  { time: "0:0:5", note: "A4", velocity: 0.6 },
  { time: "0:0:6", note: "B4", velocity: 0.3 },
  { time: "0:0:7", note: "D4", velocity: 0.4 },
  { time: "0:0:8", note: "C4", velocity: 0.8 },
  { time: "0:0:9", note: "E4", velocity: 0.5 },
  { time: "0:0:10", note: "G4", velocity: 0.2 },
  { time: "0:0:11", note: "B4", velocity: 0.7 },
  { time: "0:0:12", note: "D5", velocity: 0.9 },
  { time: "0:0:13", note: "F#5", velocity: 0.2 },
  { time: "0:0:14", note: "B4", velocity: 0.3 },
  { time: "0:0:15", note: "G4", velocity: 0.4 },
];

function runSequenceStep(time, value, setCurrentSequenceIndex) {
  setCurrentSequenceIndex(getCurrentStep());

  //actually play the note!
  synth.triggerAttackRelease(value.note, "32n", time, value.velocity);
  console.log("playing note", value.note)
}

function setRandomNote(objectIndex) {
  let octave = 2 + (objectIndex % 16) / 4;

  part.at(`0:0:${objectIndex}`, {
    time: `0:0:${objectIndex}`,
    note: getRandomNote(octave),
    velocity: Math.random(),
  });
}

function getRandomNote(octave) {
  let pitchClasses = ["C", "D", "E", "F#", "G", "A", "B"];
  let randomPitchClassIndex = Math.floor(Math.random() * pitchClasses.length);
  let randomPitchClass = pitchClasses[randomPitchClassIndex];
  let randomNote = `${randomPitchClass}${octave}`;
  return randomNote;
}

export function Sequencer(props) {
  return (
    <button
      className="btn-custom"
      onClick={() => toggleSequencer(props.setCurrentSequenceIndex)}
    >
      start/stop sequencer!
    </button>
  );
}
