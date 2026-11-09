// Ambient Aquatic Audio Engine & Web Audio API Synthesizer
// Produces serene background ambient music + water micro-interactions

let audioCtx: AudioContext | null = null;
let isMuted = false;
let isMusicActive = false;
let masterMusicGain: GainNode | null = null;
let masterEffectsGain: GainNode | null = null;
let musicInterval: number | null = null;
let activeOscillators: OscillatorNode[] = [];
let analyzerNode: AnalyserNode | null = null;
let currentVolume = 0.4;

// Listeners for music state changes
const musicStateListeners = new Set<(playing: boolean) => void>();

function notifyMusicState() {
  musicStateListeners.forEach((fn) => fn(isMusicActive));
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();

      // Master analyzer for real-time visualizer
      analyzerNode = audioCtx.createAnalyser();
      analyzerNode.fftSize = 64;

      // Master gains
      masterMusicGain = audioCtx.createGain();
      masterMusicGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime);

      masterEffectsGain = audioCtx.createGain();
      masterEffectsGain.gain.setValueAtTime(0.5, audioCtx.currentTime);

      masterMusicGain.connect(analyzerNode);
      masterEffectsGain.connect(analyzerNode);
      analyzerNode.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Pentatonic / Luxury Spa chords in Hz
const CHORD_PROGRESSIONS = [
  // F maj9 (Warm, deep oceanic)
  [174.61, 220.0, 261.63, 329.63, 392.0],
  // C add9 (Pure, crystalline)
  [130.81, 196.0, 261.63, 293.66, 392.0],
  // A min9 (Reflective, serene)
  [110.0, 164.81, 220.0, 261.63, 329.63],
  // D min9 (Soothing, spacious)
  [146.83, 174.61, 220.0, 293.66, 370.0],
];

let chordIndex = 0;

function playAmbientChord(ctx: AudioContext, freqs: number[], duration = 7.5) {
  if (!masterMusicGain) return;

  const now = ctx.currentTime;
  const chordGain = ctx.createGain();

  // Gentle fade in and long smooth tail
  chordGain.gain.setValueAtTime(0.001, now);
  chordGain.gain.linearRampToValueAtTime(0.08, now + 2.5);
  chordGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  // Soft low-pass filter to sound warm and underwater
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(450, now);
  filter.frequency.linearRampToValueAtTime(750, now + 3.0);
  filter.frequency.linearRampToValueAtTime(400, now + duration);

  chordGain.connect(filter);
  filter.connect(masterMusicGain);

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle natural chorusing/detuning
    const detune = (idx - 2) * 3;
    osc.detune.setValueAtTime(detune, now);

    osc.connect(chordGain);
    osc.start(now);
    osc.stop(now + duration + 0.5);
    activeOscillators.push(osc);
  });

  // Soft crystalline water chime note
  const chimeFreq = freqs[Math.floor(Math.random() * freqs.length)] * 2;
  const chimeOsc = ctx.createOscillator();
  const chimeGain = ctx.createGain();

  chimeOsc.type = 'sine';
  chimeOsc.frequency.setValueAtTime(chimeFreq, now + 1.2);
  chimeGain.gain.setValueAtTime(0.001, now);
  chimeGain.gain.setValueAtTime(0.025, now + 1.2);
  chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

  chimeOsc.connect(chimeGain);
  chimeGain.connect(filter);
  chimeOsc.start(now + 1.2);
  chimeOsc.stop(now + 5.0);
}

export const soundManager = {
  subscribeMusicState: (fn: (playing: boolean) => void) => {
    musicStateListeners.add(fn);
    fn(isMusicActive);
    return () => {
      musicStateListeners.delete(fn);
    };
  },

  isMusicPlaying: () => isMusicActive,

  startBackgroundMusic: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (isMusicActive) return;

    isMusicActive = true;
    notifyMusicState();

    // Play first chord immediately
    playAmbientChord(ctx, CHORD_PROGRESSIONS[chordIndex]);
    chordIndex = (chordIndex + 1) % CHORD_PROGRESSIONS.length;

    // Continuous loop every 6.8 seconds with seamless cross-fades
    if (musicInterval) clearInterval(musicInterval);
    musicInterval = window.setInterval(() => {
      if (!isMusicActive) return;
      const currentCtx = getAudioContext();
      if (!currentCtx) return;
      playAmbientChord(currentCtx, CHORD_PROGRESSIONS[chordIndex]);
      chordIndex = (chordIndex + 1) % CHORD_PROGRESSIONS.length;
    }, 6800);
  },

  stopBackgroundMusic: () => {
    isMusicActive = false;
    notifyMusicState();
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
  },

  toggleMusic: () => {
    if (isMusicActive) {
      soundManager.stopBackgroundMusic();
      return false;
    } else {
      soundManager.startBackgroundMusic();
      return true;
    }
  },

  setMusicVolume: (volume: number) => {
    currentVolume = Math.max(0, Math.min(1, volume));
    if (masterMusicGain && audioCtx) {
      masterMusicGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
    }
  },

  getMusicVolume: () => currentVolume,

  getAnalyzerData: (): Uint8Array => {
    if (!analyzerNode) return new Uint8Array(16);
    const dataArray = new Uint8Array(analyzerNode.frequencyBinCount);
    analyzerNode.getByteFrequencyData(dataArray);
    return dataArray;
  },

  getIsMuted: () => isMuted,

  toggleMute: () => {
    isMuted = !isMuted;
    if (masterEffectsGain && audioCtx) {
      masterEffectsGain.gain.setValueAtTime(isMuted ? 0 : 0.5, audioCtx.currentTime);
    }
    return isMuted;
  },

  playHudClick: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx || !masterEffectsGain) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(masterEffectsGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore
    }
  },

  playWaterDrop: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx || !masterEffectsGain) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(masterEffectsGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Ignore
    }
  },

  playWaterRipple: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx || !masterEffectsGain) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(masterEffectsGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {
      // Ignore
    }
  },

  playLaserScan: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx || !masterEffectsGain) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(masterEffectsGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Ignore
    }
  },

  playChime: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx || !masterEffectsGain) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, ctx.currentTime); // A6
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(masterEffectsGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Ignore
    }
  },
};
