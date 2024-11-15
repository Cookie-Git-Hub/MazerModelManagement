let currentQuestion = 0;
const questions = document.querySelectorAll('.question');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');

function showQuestion(index) {
  if (index < questions.length) {
    questions[index].style.display = 'block';
  }
}

function hideQuestion(index) {
  if (index < questions.length) {
    questions[index].style.display = 'none';
  }
}

function nextQuestion() {
  const currentInput = questions[currentQuestion].querySelector('input');

  if (!currentInput.value) {
    alert('Please complete this question.');
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
  console.log(currentQuestion)
  if (currentQuestion > 0 && currentQuestion !== 10) {
    prevButton.style.padding = "10px 20px";
    prevButton.style.backgroundColor = "rgb(56, 56, 56)";
    prevButton.style.color = "white";
    prevButton.style.border = "none";
    prevButton.style.borderRadius = "4px";
    prevButton.style.cursor = "pointer";
    prevButton.style.fontSize = "16px";
    prevButton.style.display = "inline";
  }else{
    prevButton.style.display = "none";
  }
  
  

  if (currentQuestion === questions.length - 1) {
    nextButton.disabled = true;
  }

 
}

// Инициализация первого вопроса
showQuestion(currentQuestion);
updateButtons();

document.addEventListener("DOMContentLoaded", () => {
  showTab(currentTab);
  setLanguage('en');
});

function setLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.innerText = el.getAttribute(`data-${lang}`);
  });
}



document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      const activeElement = document.activeElement;

      if (activeElement && activeElement.tagName === 'INPUT' && activeElement.type !== 'textarea') {
          event.preventDefault();
          activeElement.click();
      }
  }
});

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const submitButton = e.target.querySelector('button[type="submit"]');
    const loadingSpinner = document.getElementById('loadingSpinner');

    if (submitButton) {
      submitButton.style.display = 'none'; // можно также использовать submitButton.disabled = true
    }
    if (loadingSpinner) {
      loadingSpinner.style.display = 'inline-block';
    }
  
    try {
      const response = await fetch('/submit', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      alert(result.message);

      Telegram.WebApp.close();
    } catch (error) {
      alert('Error sending data');
      if (submitButton) {
        submitButton.style.display = 'block';
      }
    }
});
  
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
let selectedFiles = [];

fileInput.addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
  const files = Array.from(event.target.files);

  if (selectedFiles.length + files.length > 8) {
    alert("You can upload no more than 8 files.");
    return;
  }

  files.forEach((file) => {
    if (selectedFiles.length < 8) {
      selectedFiles.push(file);
      displayFile(file);
    }
  });

  updateFileInput();
}

function displayFile(file) {
  const previewItem = document.createElement('div');
  previewItem.classList.add('preview-item');

  const removeButton = document.createElement('div');
  removeButton.classList.add('remove-btn');
  removeButton.innerHTML = '&times;';
  removeButton.onclick = () => removeFile(file, previewItem);

  if (file.type.startsWith('image/')) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    previewItem.appendChild(img);
  } else if (file.type.startsWith('video/')) {
    const video = document.createElement('video');
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

window.onload = function() {
  let preloader = document.getElementById('preloader');
  preloader.classList.add('hide-preloader');
  setInterval(function() {
        preloader.classList.add('preloader-hidden');
  }, 990);
}