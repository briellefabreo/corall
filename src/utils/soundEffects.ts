/**
 * CORAL Notification Sound Synthesizer using Web Audio API
 * Generates clear, pleasant marimba/chime sounds without external audio assets.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a short alert chime for new or urgent announcements
 */
export function playAlertChime(isUrgent: boolean = false): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Frequencies: Higher harmonic chords for urgent, gentle dual tones for regular
    const notes = isUrgent ? [587.33, 880, 1174.66] : [523.25, 659.25, 783.99]; // D5-A5-D6 (urgent) vs C5-E5-G5 (gentle chord)

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isUrgent ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.4);
    });
  } catch (e) {
    console.warn('Audio chime playback omitted or unsupported:', e);
  }
}

/**
 * Trigger short vibration if supported by device
 */
export function triggerHaptic(isUrgent: boolean = false): void {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      if (isUrgent) {
        navigator.vibrate([100, 50, 100, 50, 200]);
      } else {
        navigator.vibrate(60);
      }
    } catch {
      // Haptics not allowed in context
    }
  }
}
