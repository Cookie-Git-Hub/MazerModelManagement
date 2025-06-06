document.addEventListener("DOMContentLoaded", () => {
  const initData = window.Telegram.WebApp.initData;
  // fetch(`https://9a0e-185-252-220-117.ngrok-free.app/validate`, {
  fetch(`https://web-production-5c260.up.railway.app/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ initData }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        console.log("Validation was successful");
      } else {
        alert(
          "Access denied: validation failed. The application must be opened via Telegram."
        );
        window.Telegram.WebApp.close();
        window.close();
      }
    })
    .catch((error) => {
      console.error("Error while checking data:", error);
      alert("An error occurred, closing the application.");
      window.Telegram.WebApp.close();
    });
});

const modal = document.getElementById("info-modal");
const closeModalBtn = document.getElementById("close-modal");
const formContainer = document.getElementById("form-container");

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  formContainer.style.display = "block";
});

// document.addEventListener("DOMContentLoaded", () => {
//   const input = document.querySelector("#input");
//   const span = input.nextElementSibling;

//   input.addEventListener("input", () => {
//     if (input.value.trim() !== "") {
//       span.style.transform = "translateY(-34px)";
//       span.style.fontSize = "0.75em";
//       span.style.color = "#8f8f8f";
//     } else {
//       span.style.transform = "translateY(0)";
//       span.style.fontSize = "1em";
//       span.style.color = "#8f8f8f";
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    const span = input.nextElementSibling;

    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        if (span) { 
          span.style.transform = "translateY(-34px)";
          span.style.fontSize = "0.75em";
          span.style.color = "#8f8f8f";
        }
      } else {
        if (span) { 
          span.style.transform = "translateY(0)";
          span.style.fontSize = "1em";
          span.style.color = "#8f8f8f";
        }
      }
    });
  });
});


let currentQuestion = 0;
const questions = document.querySelectorAll(".question");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");

function showQuestion(index) {
  if (index < questions.length) {
    questions[index].style.display = "block";
  }
}

function hideQuestion(index) {
  if (index < questions.length) {
    questions[index].style.display = "none";
  }
}

// function nextQuestion() {
//   const currentInput = questions[currentQuestion].querySelectorAll("input");


//   if (!currentInput.value) {
//     // alert('Please complete this question.');
//     currentInput.style.border = "1px solid tomato";
//     return;
//   } else {
//     currentInput.style.border = "1px solid #313131";
//   }

//   hideQuestion(currentQuestion);
//   currentQuestion++;
//   showQuestion(currentQuestion);
//   updateButtons();
// }

function nextQuestion() {

  const currentQuestionElement = document.getElementById(`question-${currentQuestion}`);
  
  if (!currentQuestionElement) {
      console.error(`Question container not found: question-${currentQuestion}`);
      return;
  }
  const inputs = currentQuestionElement.querySelectorAll("input");

  if (inputs.length === 0) {
      console.warn(`No input fields found in question-${currentQuestion}`);
      return;
  }
  let hasError = false;

  inputs.forEach((input) => {
    const span = input.nextElementSibling; 

    if (!input.value.trim()) {
      console.warn(`Input is empty: ${input.name}`);
      if (span) {
        span.style.color = "#ff0000";
      }
      input.classList.add("error-placeholder");
      hasError = true;
    } else {
      if (span) {
        span.style.color = "#313131";
      }
      input.classList.remove("error-placeholder");
    }
  });

  if (hasError) {
      return;
  }

  hideQuestion(currentQuestion);
  currentQuestion++;
  showQuestion(currentQuestion);
  updateButtons();
}


function previousQuestion() {
  hideQuestion(currentQuestion);
  currentQuestion--;
  showQuestion(currentQuestion);
  updateButtons();
}

function updateButtons() {
  if (currentQuestion > 0 && currentQuestion !== 12) {
    prevButton.style.padding = "10px 20px";
    prevButton.style.backgroundColor = "rgb(56, 56, 56)";
    prevButton.style.color = "white";
    prevButton.style.border = "none";
    prevButton.style.borderRadius = "4px";
    prevButton.style.cursor = "pointer";
    prevButton.style.fontSize = "16px";
    prevButton.style.display = "inline";
  } else {
    prevButton.style.display = "none";
  }

  if (currentQuestion === questions.length - 1) {
    nextButton.disabled = true;
  }
}

showQuestion(currentQuestion);
updateButtons();

document.addEventListener("DOMContentLoaded", () => {
  showTab(currentTab);
  setLanguage("en");
});

function setLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.innerText = el.getAttribute(`data-${lang}`);
  });
  document.getElementById("selectedLanguage").value = lang;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const activeElement = document.activeElement;

    if (
      activeElement &&
      activeElement.tagName === "INPUT" &&
      activeElement.type !== "textarea"
    ) {
      event.preventDefault();
      activeElement.click();
    }
  }
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const submitButton = e.target.querySelector('button[type="submit"]');
  const loadingSpinner = document.getElementById("loadingSpinner");

  if (submitButton) {
    submitButton.style.display = "none";
  }
  if (loadingSpinner) {
    loadingSpinner.style.display = "inline-block";
  }

  try {
    const response = await fetch("/submit", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    alert(result.message);

    Telegram.WebApp.close();
  } catch (error) {
    alert("Error sending data");
    if (submitButton) {
      submitButton.style.display = "block";
    }
  }
});

const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
let selectedFiles = [];

fileInput.addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
  const MAX_FILES = 8;
  const MAX_TOTAL_SIZE_MB = 50;
  const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;

  const files = Array.from(event.target.files);
  let totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

  for (const file of files) {
    if (selectedFiles.length >= MAX_FILES) {
      alert("You can upload no more than 8 files.");
      break;
    }

    if (totalSize + file.size > MAX_TOTAL_SIZE_BYTES) {
      alert(
        `The total volume of downloaded files exceeds ${MAX_TOTAL_SIZE_MB} MB.`
      );
      break;
    }

    selectedFiles.push(file);
    totalSize += file.size;
    displayFile(file);
  }

  updateFileInput();
}

function displayFile(file) {
  const previewItem = document.createElement("div");
  previewItem.classList.add("preview-item");

  const removeButton = document.createElement("div");
  removeButton.classList.add("remove-btn");
  removeButton.innerHTML = "&times;";
  removeButton.onclick = () => removeFile(file, previewItem);

  if (file.type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    previewItem.appendChild(img);
  } else if (file.type.startsWith("video/")) {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.controls = true;
    previewItem.appendChild(video);
  }

  previewItem.appendChild(removeButton);
  previewContainer.appendChild(previewItem);
}

function removeFile(file, previewItem) {
  selectedFiles = selectedFiles.filter((f) => f !== file);
  previewContainer.removeChild(previewItem);
  updateFileInput();
}

function updateFileInput() {
  const dataTransfer = new DataTransfer();
  selectedFiles.forEach((file) => dataTransfer.items.add(file));
  fileInput.files = dataTransfer.files;
}

window.onload = function () {
  let preloader = document.getElementById("preloader");
  preloader.classList.add("hide-preloader");
  setInterval(function () {
    preloader.classList.add("preloader-hidden");
  }, 990);
};
