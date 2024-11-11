function doSomething() {
  console.info("DOM loaded");
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", doSomething);
} else {
  doSomething();
}


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.en').addEventListener('click', function() {
        document.querySelectorAll('[data-en]').forEach(function(element) {
            element.textContent = element.getAttribute('data-en');
        });
    });

    document.querySelector('.ua').addEventListener('click', function() {
        document.querySelectorAll('[data-ua]').forEach(function(element) {
            element.textContent = element.getAttribute('data-ua');
        });
    });
});

// let mediaCount = 0;
// const uploadedFiles = [];

// // Функция для создания кнопки "Сделайте фото или видео"
// function createAddPhotoButton() {
//     const addPhotoButton = document.createElement("div");
//     addPhotoButton.classList.add("add-photo");
//     addPhotoButton.innerHTML = `<span>Сделайте фото или видео</span>`;
//     addPhotoButton.onclick = () => document.getElementById("mediaInput").click();
//     return addPhotoButton;
// }


// // Функция для добавления медиа
// function addMedia(event) {
//   const files = Array.from(event.target.files); // Получаем все загруженные файлы

//   files.forEach(file => {
//       if (mediaCount < 8) { // Проверяем лимит загрузки
//           const reader = new FileReader();
//           const mediaType = file.type.startsWith("video") ? "video" : "image";

//           reader.onload = function(e) {
//               const photoSection = document.getElementById("photoSection");

//               // Создаем блок для медиа
//               const mediaDiv = document.createElement("div");
//               mediaDiv.classList.add("photo");

//               if (mediaType === "image") {
//                   const imgElement = document.createElement("img");
//                   imgElement.src = e.target.result;
//                   mediaDiv.appendChild(imgElement);
//               } else if (mediaType === "video") {
//                   const videoElement = document.createElement("video");
//                   videoElement.src = e.target.result;
//                   videoElement.controls = true;
//                   mediaDiv.appendChild(videoElement);
//               }

//               photoSection.insertBefore(mediaDiv, document.querySelector(".add-photo")); // Вставляем перед кнопкой "Сделайте фото или видео"
              
//               // Добавляем файл в массив uploadedFiles
//               uploadedFiles.push(file);

//               mediaCount++;
//               checkSubmitButton();

//               // Проверяем, достигнут ли лимит в 8 медиафайлов
//               if (mediaCount >= 8) {
//                   document.querySelector(".add-photo").remove(); // Удаляем кнопку добавления, если достигнут лимит
//               }
//           };

//           // Читаем содержимое файла для отображения
//           reader.readAsDataURL(file);
//       }
//   });
// }

// // Добавляем начальную кнопку "Сделайте фото или видео"
// document.getElementById("photoSection").appendChild(createAddPhotoButton());


let mediaCount = 0;
const uploadedFiles = [];

console.log("uploadedFiles")
console.log(uploadedFiles)

// Функция для создания кнопки "Сделайте фото или видео"
function createAddPhotoButton() {
    const addPhotoButton = document.createElement("div");
    addPhotoButton.classList.add("add-photo");
    addPhotoButton.innerHTML = `<span>Сделайте фото или видео</span>`;
    addPhotoButton.onclick = () => document.getElementById("mediaInput").click();
    return addPhotoButton;
}

// Функция для добавления медиа
function addMedia(event) {
  const files = Array.from(event.target.files); // Получаем все загруженные файлы
  const maxFileSize = 20 * 1024 * 1024; // 20MB в байтах
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "video/mp4", "video/webm"];

  // Проверяем общее количество файлов
  if (mediaCount + files.length > 8) {
      alert("Общее количество файлов не должно превышать 8.");
      return;
  }

  files.forEach(file => {
      if (mediaCount < 8) { // Проверяем лимит загрузки
          if (!allowedTypes.includes(file.type)) {
              alert("Файл не поддерживается. Допустимые форматы: PNG, JPEG, JPG, MP4, WEBM.");
              return;
          }
          if (file.size > maxFileSize) {
              alert("Размер файла превышает 20 МБ.");
              return;
          }

          const reader = new FileReader();
          const mediaType = file.type.startsWith("video") ? "video" : "image";

          reader.onload = function(e) {
              const photoSection = document.getElementById("photoSection");

              // Создаем блок для медиа
              const mediaDiv = document.createElement("div");
              mediaDiv.classList.add("photo");

              if (mediaType === "image") {
                  const imgElement = document.createElement("img");
                  imgElement.src = e.target.result;
                  mediaDiv.appendChild(imgElement);
              } else if (mediaType === "video") {
                  const videoElement = document.createElement("video");
                  videoElement.src = e.target.result;
                  videoElement.controls = true;
                  mediaDiv.appendChild(videoElement);
              }

              photoSection.insertBefore(mediaDiv, document.querySelector(".add-photo")); // Вставляем перед кнопкой "Сделайте фото или видео"
              
              // Добавляем файл в массив uploadedFiles
              uploadedFiles.push(file);

              mediaCount++;
              checkSubmitButton();

              // Проверяем, достигнут ли лимит в 8 медиафайлов
              if (mediaCount >= 8) {
                  document.querySelector(".add-photo").remove(); // Удаляем кнопку добавления, если достигнут лимит
              }
          };

          // Читаем содержимое файла для отображения
          reader.readAsDataURL(file);
      }
  });
}

// Добавляем начальную кнопку "Сделайте фото или видео"
document.getElementById("photoSection").appendChild(createAddPhotoButton());



// Функция для активации кнопки "Дальше"
function checkSubmitButton() {
    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = mediaCount === 0;
    submitButton.style.opacity = mediaCount > 0 ? "1" : "0.5";
}

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}




