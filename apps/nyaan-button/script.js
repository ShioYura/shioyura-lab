const button = document.getElementById("nyaanButton");
const message = document.getElementById("message");
const countText = document.getElementById("count");

let count = 0;
let audioContext;

function playFallbackMeow() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    return;
  }

  audioContext ||= new AudioContext();

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(620, now);
  oscillator.frequency.exponentialRampToValueAtTime(380, now + 0.34);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.4);
}

function speakNyaan() {
  if (!("speechSynthesis" in window)) {
    playFallbackMeow();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance("にゃーん");
  utterance.lang = "ja-JP";
  utterance.rate = 0.88;
  utterance.pitch = 1.45;
  utterance.volume = 1;
  utterance.onerror = playFallbackMeow;

  window.speechSynthesis.speak(utterance);
}

function animatePress() {
  button.classList.remove("is-pressed");
  message.classList.remove("is-pop");

  requestAnimationFrame(() => {
    button.classList.add("is-pressed");
    message.classList.add("is-pop");
  });

  window.setTimeout(() => {
    button.classList.remove("is-pressed");
  }, 170);
}

button.addEventListener("click", () => {
  count += 1;
  countText.textContent = String(count);
  message.textContent = "にゃーん";

  animatePress();
  speakNyaan();
});
