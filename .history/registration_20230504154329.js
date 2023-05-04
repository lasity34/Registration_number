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

const regInstance = registrationNumber();

displayRegNumbersOnRefresh();

function displayRegNumbersOnRefresh() {
  let registrationNumbersArray =
    JSON.parse(localStorage.getItem("regNum")) || [];
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

function registrationNumAdd() {
  resetErrorMessages();
  const regValue = regInput.value.trim();
  regInstance.setValueInput(regValue);
  const reg = regInstance.getValueInput();

  if (reg) {
    if (regInstance.addRegistrationNumber()) {
      storeRegNumber();
      updateDisplayWithNewRegNumber();
    }
  }

  regInput.value = "";
}

function resetErrorMessages() {
  errorImage.innerHTML = "";
  filterMessageDisplay.innerHTML = "";
}

function storeRegNumber() {
  const storedRegArr = regInstance.getArr();
  localStorage.setItem("regNum", JSON.stringify(storedRegArr));
}

function updateDisplayWithNewRegNumber() {
  regInstance.filterReg();
  regDisplay.innerHTML = "";
  const newRegArr = regInstance.getFilteredArr() || [];

  newRegArr.forEach((reg) => {
    appendRegToNumberList(reg.reg);
  });

  displayAddedMessage();
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

function inputValid() {
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

function clear() {
  const userConfirm = confirm("Are you sure you want to clear all data?");

  if (userConfirm) {
    localStorage.clear();
    errorMessage.innerHTML = "";
    regDisplay.innerHTML = "";
    regInput.value = "";
    townList.value = "select_town";
    localStorage.setItem("regNum", JSON.stringify([]));
    regInstance.setSavedArr(regArr);
    resetErrorMessages();
  }
}

//  filters towns from the drop box
function selectTown() {
  regInstance.setLocationValue(townList.value);
  regInstance.filterReg();
  const filteredArr = regInstance.getFilteredArr();
  const filterMessage = regInstance.filteredMessage();

  displayFilteredArray(filteredArr)
  if (filteredArr.length === 0) {
    errorImage.innerHTML = '<img src="./images/not_found.svg" width="200"/>';
  } else {
    errorImage.innerHTML = "";
  }
  filterMessageDisplay.innerHTML = filterMessage;
  
 
}

function displayFilteredArray(filteredArr) {
  regDisplay.innerHTML = "";
  if (filteredArr) {
    filteredArr.forEach((reg) => {
      appendRegToNumberList(reg.reg)
    });
  } else {
    regDisplay.innerHTML = "";
  }
}

townList.addEventListener("click", selectTown);
clearBtn.addEventListener("click", clear);
addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
