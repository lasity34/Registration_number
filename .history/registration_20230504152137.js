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

// global code
function displayRegNumbersOnRefresh() {
  let registrationNumbersArray =
    JSON.parse(localStorage.getItem("regNum")) || [];

  regInstance.setSavedArr(registrationNumbersArray);
  regInstance.setLocationValue(townList.value);

  // when refresh the list will still display
  if (Array.isArray(registrationNumbersArray)) {
    registrationNumbersArray.forEach((reg) => {
     appendRegToNumberList(reg.reg)
    });
  }
}

function appendRegToNumberList(regNumber) {
  const newLi = document.createElement("li");
  newLi.textContent = regNumber
  regDisplay.appendChild(newLi);
}

// add reg number when clicked
function registrationNumAdd() {
  // set value
  const regValue = regInput.value;
  regInstance.setValueInput(regValue.trim());
  // get value after all validations
  const reg = regInstance.getValueInput();

  // when add is clicked error is cleared
  resetErrorMessages()

  // if reg value is true object will be created an stored
  if (reg) {
    if (regInstance.addRegistrationNumber()) {
      const storedRegArr = regInstance.getArr();

      //  local storage will save all data
      localStorage.setItem("regNum", JSON.stringify(storedRegArr));

      // message for every place added
      messageDisplay.classList.add("message_container");
      messageDisplay.innerHTML = regInstance.getMessage();
      function timeout() {
        messageDisplay.classList.remove("message_container");
        messageDisplay.innerHTML = "";
      }
      setTimeout(timeout, 2000);
    }

    //  this will create populate list even if on a filter/ selected town
    regInstance.filterReg();
    regDisplay.innerHTML = "";
    const newRegArr = regInstance.getFilteredArr() || [];
    newRegArr.forEach((reg) => {
      const newLi = document.createElement("li");
      newLi.textContent = reg;
      regDisplay.appendChild(newLi);
    });
  }

  // resets input value
  regInput.value = "";
}


function resetErrorMessages() {
  errorImage.innerHTML = "";
  filterMessageDisplay.innerHTML = "";
}

// validator message code

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

//  clears all data
function clear() {
  const userConfirm = confirm("Are you sure you want to clear all data?");

  if (userConfirm) {
    localStorage.clear();
    errorMessage.innerHTML = "";
    regDisplay.innerHTML = "";
    regInput.value = "";
    registrationNumbersArray = [];
    townList.value = "select_town";
    localStorage.setItem("regNum", JSON.stringify([]));
    regInstance.setSavedArr(regArr);
    resetErrorMessages()
  }
}



//  filters towns from the drop box
function selectTown() {
  regInstance.setLocationValue(townList.value);
  regInstance.filterReg();
  const filteredArr = regInstance.getFilteredArr();
  const filterMessage = regInstance.filteredMessage();

  if (filteredArr.length === 0) {
    errorImage.innerHTML = '<img src="./images/not_found.svg" width="200"/>';
  } else {
    errorImage.innerHTML = "";
  }
  filterMessageDisplay.innerHTML = filterMessage;
  regDisplay.innerHTML = "";
  if (filteredArr) {
    filteredArr.forEach((reg) => {
      const newLi = document.createElement("li");
      newLi.textContent = reg;
      regDisplay.appendChild(newLi);
    });
  } else {
    regDisplay.innerHTML = "";
  }
}

townList.addEventListener("click", selectTown);
clearBtn.addEventListener("click", clear);
addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
