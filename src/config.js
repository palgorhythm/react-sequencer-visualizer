const voice0 = {
  volume: -20,
  portamento: 50,
  oscillator: {
    type: "sine",
  },
  filterEnvelope: {
    attack: 0.01,
    decay: 0,
    sustain: 0.5,
    release: 0.2,
  },
  envelope: {
    attack: 0.01,
    decay: 0,
    sustain: 0.5,
    release: 0.2,
  },
};
const voice1 = {
  volume: -20,
  portamento: 100,
  oscillator: {
    type: "sawtooth",
  },
  filterEnvelope: {
    attack: 0.01,
    decay: 0,
    sustain: 0.5,
    release: 0.2,
  },
  envelope: {
    attack: 0.01,
    decay: 0,
    sustain: 0.5,
    release: 0.2,
  },
};

export const CONFIG = {
  synth: {
    vibratoAmount: 0.5,
    vibratoRate: 5,
    harmonicity: 1,
    voice0,
    voice1,
  },
  visualizer: {
    baseRotationSpeed: 0.04,
  },
};
