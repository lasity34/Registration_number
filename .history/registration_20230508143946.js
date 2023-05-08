const addRegNumBtn = document.querySelector(".add_btn");
const clearBtn = document.querySelector(".clear_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");
const errorMessage = document.querySelector("#error");
const validator = document.querySelector(".valid");
const townList = document.querySelector("#dropdown");
const town = document.querySelector(".town");
const messageDisplay = document.querySelector(".added_item");
const filterMessageDisplay = document.querySelector(".filter_message");
const errorImage = document.querySelector(".error_image");


//  Instance
const regInstance = registrationNumber();

displayRegNumbersOnRefresh()

// main functions
function displayRegNumbersOnRefresh() {
  let registrationNumbersArray = JSON.parse(localStorage.getItem("regNum")) || [];
  regInstance.setSavedArr(registrationNumbersArray);
  regInstance.setLocationValue(townList.value);

  if (Array.isArray(registrationNumbersArray)) {
    registrationNumbersArray.forEach((reg) => {
      appendRegToNumberList(reg.reg);
    });
  }
}

function appendRegToNumberList(regNumber) {
  const newLi = document.createElement("li");
  newLi.textContent = regNumber;
  regDisplay.appendChild(newLi);
}

function registrationNumAdd_temp() {
  resetErrorMessages();
  const regValue = regInput.value.trim();
  regInstance.setValueInput(regValue);
  const reg = regInstance.getValueInput();

  
    if (reg && regInstance.addRegistrationNumber()) {
      const storedRegArr = regInstance.getArr();
      localStorage.setItem("regNum", JSON.stringify(storedRegArr));
      regInstance.filterReg();
      regDisplay.innerHTML = "";

      const newRegArr = regInstance.getFilteredArr() || [];
      newRegArr.forEach((reg) => {
        appendRegToNumberList(reg);
      });

      displayAddedMessage();
    }
   
  regInput.value = "";
}


// helper functions
function resetErrorMessages() {
  errorImage.innerHTML = "";
  filterMessageDisplay.innerHTML = "";
}

function displayAddedMessage() {
  messageDisplay.classList.add("message_container");
  messageDisplay.innerHTML = regInstance.getMessage();
  function timeout() {
    messageDisplay.classList.remove("message_container");
    messageDisplay.innerHTML = "";
  }
  setTimeout(timeout, 2000);
}

function inputValid_temp() {
  const regValue = regInput.value;
  regInstance.setValueInput(regValue);
  regInstance.testValueInput();

  if (regInstance.getErrorMessage()) {
    errorMessage.innerHTML = regInstance.getErrorMessage();
    validator.classList.add("invalid");
  } else {
    validator.classList.remove("invalid");
    errorMessage.innerHTML = "";
  }
}

function clear_temp() {
  const userConfirm = confirm("Are you sure you want to clear all data?");

  if (userConfirm) {
    localStorage.clear();
    errorMessage.innerHTML = "";
    regDisplay.innerHTML = "";
    regInput.value = "";
    townList.value = "Select Town";
    localStorage.setItem("regNum", JSON.stringify([]));
    regInstance.setSavedArr([]);
    resetErrorMessages();
  }
}

//  filters towns from the drop box
function selectTown_temp() {
  regInstance.setLocationValue(townList.value);
  regInstance.filterReg();
  const filteredArr = regInstance.getFilteredArr();
  const filterMessage = regInstance.filteredMessage();
  filterMessageDisplay.innerHTML = filterMessage;
  displayFilteredArray(filteredArr);

  if (filteredArr.length === 0) {
    errorImage.innerHTML = '<img src="./images/not_found.svg" width="200"/>';
  } else {
    errorImage.innerHTML = "";
  }
}

function displayFilteredArray(filteredArr) {
  regDisplay.innerHTML = "";
  if (filteredArr) {
    filteredArr.forEach((reg) => {
      appendRegToNumberList(reg);
    });
  } else {
    regDisplay.innerHTML = "";
  }
}


townList.addEventListener("change", selectTown_temp);
clearBtn.addEventListener("click", clear_temp);
addRegNumBtn.addEventListener("click", registrationNumAdd_temp);
regInput.addEventListener("input", inputValid_temp);
