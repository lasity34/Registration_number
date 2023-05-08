const addRegNumBtnTemp = document.querySelector(".add_btn_temp");
const clearBtnTemp = document.querySelector(".clear_btn_temp");
const regInputTemp = document.querySelector(".form__input_temp");
const regDisplayTemp = document.querySelector(".reg_display_temp");
const errorMessageTemp = document.querySelector("#error_temp");
const validatorTemp = document.querySelector(".valid_temp");
const townDataElemTemp = document.querySelector("#dropdown_temp");
const townTemp = document.querySelector(".town_temp");
const messageDisplayTemp = document.querySelector(".added_item_temp");
const filterMessageDisplayTemp = document.querySelector(".filter_message_temp");
const errorImageTemp = document.querySelector(".error_image_temp");

//  Instance
const regInstance = registrationNumber();

displayRegNumbersOnRefresh();

// main functions
function displayRegNumbersOnRefresh() {
  let registrationNumbersArray =
    JSON.parse(localStorage.getItem("regNum")) || [];
  regInstance.setSavedArr(registrationNumbersArray);
  regInstance.setLocationValue(townDataElemTemp.value);

  if (Array.isArray(registrationNumbersArray)) {
    registrationNumbersArray.forEach((reg) => {
      appendRegToNumberList(reg.reg);
    });
  }
  updateTownTemplate()
}

function appendRegToNumberList(regNumber) {
  const newLi = document.createElement("li");
  newLi.textContent = regNumber;
  regDisplayTemp.appendChild(newLi);
}

function registrationNumAdd() {
  resetErrorMessages();
  const regValue = regInputTemp.value.trim();
  regInstance.setValueInput(regValue);
  const reg = regInstance.getValueInput();

  if (reg && regInstance.addRegistrationNumber()) {
    const storedRegArr = regInstance.getArr();
    localStorage.setItem("regNum", JSON.stringify(storedRegArr));
    regInstance.filterReg();
    regDisplayTemp.innerHTML = "";

    const newRegArr = regInstance.getFilteredArr() || [];
    newRegArr.forEach((reg) => {
      appendRegToNumberList(reg);
    });

    displayAddedMessage();
  }

  regInputTemp.value = "";
  updateTownTemplate()
}

// helper functions
function resetErrorMessages() {
  errorImageTemp.innerHTML = "";
  filterMessageDisplayTemp.innerHTML = "";
}

function displayAddedMessage() {
  messageDisplayTemp.classList.add("message_container");
  messageDisplayTemp.innerHTML = regInstance.getMessage();
  function timeout() {
    messageDisplayTemp.classList.remove("message_container");
    messageDisplayTemp.innerHTML = "";
  }
  setTimeout(timeout, 2000);
}

function inputValid() {
  const regValue = regInputTemp.value;
  regInstance.setValueInput(regValue);
  regInstance.testValueInput();

  if (regInstance.getErrorMessage()) {
    errorMessageTemp.innerHTML = regInstance.getErrorMessage();
    validatorTemp.classList.add("invalid");
  } else {
    validatorTemp.classList.remove("invalid");
    errorMessageTemp.innerHTML = "";
  }
}

function clear() {
  const userConfirm = confirm("Are you sure you want to clear all data?");

  if (userConfirm) {
    localStorage.clear();
    errorMessageTemp.innerHTML = "";
    regDisplayTemp.innerHTML = "";
    regInputTemp.value = "";
    townDataElemTemp.value = "Select Town";
    localStorage.setItem("regNum", JSON.stringify([]));
    regInstance.setSavedArr([]);
    resetErrorMessages();
  }
}

//  filters towns from the drop box
function selectTown() {
  regInstance.setLocationValue(townList.value);
  regInstance.filterReg();
  const filteredArr = regInstance.getFilteredArr();
  const filterMessage = regInstance.filteredMessage();
  filterMessageDisplayTemp.innerHTML = filterMessage;
  displayFilteredArray(filteredArr);

  if (filteredArr.length === 0) {
    errorImageTemp.innerHTML = '<img src="./images/not_found.svg" width="200"/>';
  } else {
    errorImageTemp.innerHTML = "";
  }
}

function displayFilteredArray(filteredArr) {
  regDisplayTemp.innerHTML = "";
  if (filteredArr) {
    filteredArr.forEach((reg) => {
      appendRegToNumberList(reg);
    });
  } else {
    regDisplayTemp.innerHTML = "";
  }
}

function updateTownTemplate() {
  const templateSource = document.querySelector("#regTemplate").innerHTML;
  const registrationTemplate = Handlebars.compile(templateSource);

  const townData = {
    differentTowns: [
      { name: "Select Town" },
      {
        name: "Cape Town",
      },
      {
        name: "Stellenbosch",
      },
      {
        name: "Paarl",
      },
    ],
  };

  const userDataHTML = registrationTemplate(townData);

  townDataElemTemp.innerHTML = userDataHTML;
}

townDataElemTemp.addEventListener("change", selectTown);
clearBtnTemp.addEventListener("click", clear);
addRegNumBtnTemp.addEventListener("click", registrationNumAdd);
regInputTemp.addEventListener("input", inputValid);
