const addRegNumBtnTemp = document.querySelector(".add_btn_temp");
const clearBtnTemp = document.querySelector(".clear_btn_temp");
const regInputTemp = document.querySelector(".form__input_temp");
const regDisplayTemp = document.querySelector(".reg_display_temp");
const errorMessageTemp = document.querySelector("#error_temp");
const validatorTemp = document.querySelector(".valid_temp");
const townDataElemTemp = document.querySelector("#dropdown_temp");
const messageDisplayTemp = document.querySelector(".added_item_temp");
const filterMessageDisplayTemp = document.querySelector(".filter_message_temp");
const errorImageTemp = document.querySelector(".error_image_temp");

//  Instance
const regInstanceTemp = registrationNumber_temp();

displayRegNumbersOnRefresh();

// main functions
function displayRegNumbersOnRefresh() {
  let registrationNumbersArray =
    JSON.parse(localStorage.getItem("regNum")) || [];
    regInstanceTemp.setSavedArr(registrationNumbersArray);
    updateTownTemplate()
    regInstanceTemp.setLocationValue(townDataElemTemp.value);

  if (Array.isArray(registrationNumbersArray)) {
    registrationNumbersArray.forEach((reg) => {
      appendRegToNumberList(reg.reg);
    });
  }

}

function appendRegToNumberList(regNumber) {
  const newLi = document.createElement("li");
  newLi.textContent = regNumber;
  regDisplayTemp.appendChild(newLi);
}

function registrationNumAdd() {
  resetErrorMessages();
  const regValue = regInputTemp.value.trim();
  regInstanceTemp.setValueInput(regValue);
  const reg = regInstanceTemp.getValueInput();

  if (reg && regInstanceTemp.addRegistrationNumber()) {
    const storedRegArr = regInstanceTemp.getArr();
    localStorage.setItem("regNum", JSON.stringify(storedRegArr));
    regInstanceTemp.filterReg();
    regDisplayTemp.innerHTML = "";

    const newRegArr = regInstanceTemp.getFilteredArr() || [];
    newRegArr.forEach((reg) => {
      appendRegToNumberList(reg);
    });

    displayAddedMessage();
  }

  regInputTemp.value = "";
  updateTownTemplate(townDataElemTemp.value)
}

// helper functions
function resetErrorMessages() {
  errorImageTemp.innerHTML = "";
  filterMessageDisplayTemp.innerHTML = "";
}

function displayAddedMessage() {
  messageDisplayTemp.classList.add("message_container");
  messageDisplayTemp.innerHTML = regInstanceTemp.getMessage();
  function timeout() {
    messageDisplayTemp.classList.remove("message_container");
    messageDisplayTemp.innerHTML = "";
  }
  setTimeout(timeout, 2000);
}

function inputValid() {
  const regValue = regInputTemp.value;
  regInstanceTemp.setValueInput(regValue);
  regInstanceTemp.testValueInput();

  if (regInstanceTemp.getErrorMessage()) {
    errorMessageTemp.innerHTML = regInstanceTemp.getErrorMessage();
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
    regInstanceTemp.setSavedArr([]);
    resetErrorMessages();
  }
}

//  filters towns from the drop box
function selectTown() {
  regInstanceTemp.setLocationValue(townDataElemTemp.value);
  regInstanceTemp.filterReg();
  const filteredArr = regInstanceTemp.getFilteredArr();
  const filterMessage = regInstanceTemp.filteredMessage();
  filterMessageDisplayTemp.innerHTML = filterMessage;
  displayFilteredArray(filteredArr);

  if (filteredArr.length === 0) {
    errorImageTemp.innerHTML = '<img src="./images/not_found.svg" width="200"/>';
  } else {
    errorImageTemp.innerHTML = "";
  }

  updateTownTemplate(townDataElemTemp.value)
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

function updateTownTemplate(selectedValue) {
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

  townDataElemTemp.value = selectedValue
}

townDataElemTemp.addEventListener("change", selectTown);
clearBtnTemp.addEventListener("click", clear);
addRegNumBtnTemp.addEventListener("click", registrationNumAdd);
regInputTemp.addEventListener("input", inputValid);
