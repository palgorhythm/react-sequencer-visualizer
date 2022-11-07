import { CONFIG } from "../config.js";
import * as Tone from "tone";
import { useState } from "react";

let part, synth; // define global variables

// This is the array of notes that will be played by the sequencer.
// Change them here to create a unique sequence!
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

// This is the function that starts and stops the sequencer.
// It kicks off a Tone.Part that handles calling runSequenceStep repeatedly.
export function toggleSequencer(
  setCurrentSequenceIndex,
  shouldPlay,
  setShouldPlay
) {
  if (!part) {
    // If we haven't called this function yet, set up the sequence and the synth.
    Tone.Transport.bpm.value = 90;
    // synthConfig lives in lib/synthConfig.js: check it out and play with some of the values!
    synth = new Tone.DuoSynth(CONFIG.synth).toDestination();
    part = new Tone.Part(
      (time, value) => runSequenceStep(time, value, setCurrentSequenceIndex),
      loopNotes
    );
    part.loop = true;
    part.start(0);
  }
  if (shouldPlay) {
    console.log("Starting sequence!");
    Tone.Transport.start();
    setShouldPlay(false);
  } else {
    console.log("Stopping sequence.");
    Tone.Transport.pause();
    setShouldPlay(true);
  }
}

function getCurrentStep() {
  return Math.round((part ? part.progress : 0) * 16);
}

function runSequenceStep(time, value, setCurrentSequenceIndex) {
  setCurrentSequenceIndex(getCurrentStep());

  //actually play the note!
  synth.triggerAttackRelease(value.note, "32n", time, value.velocity);
  console.log("playing note", value.note);
}

// This function is not used. What does it do?
// Try using it in the sequencer!
function setRandomNote(objectIndex) {
  let octave = 2 + (objectIndex % 16) / 4;

  part.at(`0:0:${objectIndex}`, {
    time: `0:0:${objectIndex}`,
    note: getRandomNote(octave),
    velocity: Math.random(),
  });
}

// This is a utility function that gives you a random note.
// Try making a sequence with it!
function getRandomNote(octave) {
  let pitchClasses = ["C", "D", "E", "F#", "G", "A", "B"];
  let randomPitchClassIndex = Math.floor(Math.random() * pitchClasses.length);
  let randomPitchClass = pitchClasses[randomPitchClassIndex];
  let randomNote = `${randomPitchClass}${octave}`;
  return randomNote;
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

// This is the React component that we will use in our app.
// It stores state about whether the sequence should currently be playing,
// and defines a button that will toggle the sequencer.
export function Sequencer(props) {
  const [shouldPlay, setShouldPlay] = useState(true);
  return (
    <button
      className="btn-custom"
      onClick={() =>
        toggleSequencer(
          props.setCurrentSequenceIndex,
          shouldPlay,
          setShouldPlay
        )
      }
    >
      {shouldPlay ? "start" : "stop"} sequencer!
    </button>
  );
}
