const imageInput = document.getElementById("imageInput");
const fileName = document.getElementById("fileName");
const ocrButton = document.getElementById("ocrButton");
const clearButton = document.getElementById("clearButton");
const progressBar = document.getElementById("progressBar");
const statusText = document.getElementById("statusText");
const previewPlaceholder = document.getElementById("previewPlaceholder");
const previewImage = document.getElementById("previewImage");
const resultText = document.getElementById("resultText");
const copyButton = document.getElementById("copyButton");
const copyMessage = document.getElementById("copyMessage");

let selectedFile = null;
let currentObjectUrl = "";
let isReading = false;

function setStatus(message) {
  statusText.textContent = message;
}

function setProgress(percent) {
  progressBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
}

function setBusy(isBusy) {
  isReading = isBusy;
  ocrButton.disabled = isBusy || !selectedFile;
  imageInput.disabled = isBusy;
  clearButton.disabled = isBusy;
}

function clearObjectUrl() {
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = "";
  }
}

function resetApp() {
  clearObjectUrl();
  selectedFile = null;
  imageInput.value = "";
  fileName.textContent = "書類・メモ・ホワイトボードの画像を選んでください";
  previewImage.removeAttribute("src");
  previewImage.style.display = "none";
  previewPlaceholder.style.display = "grid";
  resultText.value = "";
  copyMessage.textContent = "";
  setProgress(0);
  setStatus("画像を選択するとOCRを実行できます。");
  setBusy(false);
}

imageInput.addEventListener("change", () => {
  const file = imageInput.files?.[0];

  if (!file) {
    resetApp();
    return;
  }

  clearObjectUrl();
  selectedFile = file;
  currentObjectUrl = URL.createObjectURL(file);
  previewImage.src = currentObjectUrl;
  previewImage.style.display = "block";
  previewPlaceholder.style.display = "none";
  fileName.textContent = file.name || "撮影した画像";
  resultText.value = "";
  copyMessage.textContent = "";
  setProgress(0);
  setStatus("画像を読み込みました。OCRを実行できます。");
  ocrButton.disabled = false;
});

ocrButton.addEventListener("click", async () => {
  if (!selectedFile || isReading) {
    return;
  }

  if (!window.Tesseract) {
    setStatus("Tesseract.jsを読み込めませんでした。ネットワーク接続を確認してください。");
    return;
  }

  setBusy(true);
  setProgress(5);
  setStatus("OCRを準備しています...");
  copyMessage.textContent = "";

  try {
    const response = await Tesseract.recognize(selectedFile, "jpn+eng", {
      logger: updateProgress
    });

    const text = response.data.text.trim();
    resultText.value = text || "文字を読み取れませんでした。画像を明るくして再撮影すると改善する場合があります。";
    setProgress(100);
    setStatus("OCRが完了しました。必要に応じてテキストを編集できます。");
  } catch (error) {
    console.error(error);
    setProgress(0);
    setStatus("OCRに失敗しました。画像を変えてもう一度試してください。");
  } finally {
    setBusy(false);
  }
});

function updateProgress(message) {
  if (message.status === "recognizing text" && typeof message.progress === "number") {
    const percent = Math.round(message.progress * 100);
    setProgress(percent);
    setStatus(`読み取り中... ${percent}%`);
    return;
  }

  if (message.status === "loading tesseract core") {
    setProgress(12);
    setStatus("OCRエンジンを読み込んでいます...");
    return;
  }

  if (message.status === "loading language traineddata") {
    setProgress(24);
    setStatus("日本語・英語の辞書データを読み込んでいます...");
    return;
  }

  if (message.status === "initializing api") {
    setProgress(40);
    setStatus("OCRを初期化しています...");
  }
}

copyButton.addEventListener("click", async () => {
  const text = resultText.value;
  copyMessage.textContent = "";

  if (!text.trim()) {
    copyMessage.textContent = "コピーするテキストがありません。";
    return;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      resultText.focus();
      resultText.select();
      document.execCommand("copy");
    }
    copyMessage.textContent = "抽出テキストをコピーしました。";
  } catch (error) {
    console.error(error);
    copyMessage.textContent = "コピーに失敗しました。テキストを選択して手動でコピーしてください。";
  }
});

clearButton.addEventListener("click", resetApp);

resetApp();
