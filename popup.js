const output = document.getElementById("output");

// 🔥 Load saved data
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("randstorm_output");
  if (saved) output.value = saved;
});

// 🔥 Generate
document.getElementById("generate").addEventListener("click", () => {
  const length = parseInt(document.getElementById("length").value);

  const useUpper = document.getElementById("uppercase").checked;
  const useLower = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;
  const noSpace = document.getElementById("noSpace").checked;

  let chars = "";

  if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (useNumbers) chars += "0123456789";
  if (useSymbols) chars += "!@#$%^&*()_+[]{}<>?/";

  if (!chars) {
    alert("Select at least one option!");
    return;
  }

  let result = "";

  if (noSpace) {
    result = Array.from({ length }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  } else {
    let words = [];
    let currentLength = 0;

    while (currentLength < length) {
      let wordLength = Math.floor(Math.random() * 6) + 3;
      let word = "";

      for (let i = 0; i < wordLength; i++) {
        word += chars[Math.floor(Math.random() * chars.length)];
      }

      words.push(word);
      currentLength += wordLength + 1;
    }

    let sentence = words.join(" ");
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);

    result = sentence + ".";
  }

  output.value = result;

  // 💾 Save
  localStorage.setItem("randstorm_output", result);
});

// 📋 Copy
document.getElementById("copy").addEventListener("click", () => {
  output.select();
  document.execCommand("copy");
});

// 🧹 Clear
document.getElementById("clear").addEventListener("click", () => {
  output.value = "";
  localStorage.removeItem("randstorm_output");
});