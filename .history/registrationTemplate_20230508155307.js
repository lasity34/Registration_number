const addRegNumBtnTemp = document.querySelector(".add_btn_temp");
const clearBtnTemp = document.querySelector(".clear_btn_temp");
const regInputTemp = document.querySelector(".form__input_temp");
const regDisplayTemp = document.querySelector("#reg_display_container_template ul.reg_display_temp");
const errorMessageTemp = document.querySelector("#error_temp");
const validatorTemp = document.querySelector(".valid_temp");
const townDataElemTemp = document.querySelector("#dropdown_temp");
const messageDisplayTemp = document.querySelector(".added_item_temp");
const filterMessageDisplayTemp = document.querySelector(".filter_message_temp");
const errorImageTemp = document.querySelector(".error_image_temp");

//  Instance
const regInstanceTemp = registrationNumber_temp();

displayRegNumbersOnRefresh_temp();

// main functions
function displayRegNumbersOnRefresh_temp() {
  let registrationNumbersArray =
    JSON.parse(localStorage.getItem("regNumTemp")) || [];
    regInstanceTemp.setSavedArr(registrationNumbersArray);

    
    
    regInstanceTemp.setLocationValue(townDataElemTemp.value);
    regInstanceTemp.filterReg();
    const filteredArr = regInstanceTemp.getFilteredArr();

  if (Array.isArray(filteredArr)) {
    filteredArr.forEach((reg) => {
      appendRegToNumberList_temp(reg);
    });
  }

}

function appendRegToNumberList_temp(regNumber) {
  const newLi = document.createElement("li");
  newLi.textContent = regNumber;
  regDisplayTemp.appendChild(newLi);
}

function registrationNumAdd_temp() {
  resetErrorMessages_temp();
  const regValue = regInputTemp.value.trim();
  regInstanceTemp.setValueInput(regValue);
  const reg = regInstanceTemp.getValueInput();

  if (reg && regInstanceTemp.addRegistrationNumber()) {
    const storedRegArr = regInstanceTemp.getArr();
    localStorage.setItem("regNumTemp", JSON.stringify(storedRegArr));
    regInstanceTemp.filterReg();
    regDisplayTemp.innerHTML = "";

    const newRegArr = regInstanceTemp.getFilteredArr() || [];
    newRegArr.forEach((reg) => {
      appendRegToNumberList_temp(reg);
    });

    displayAddedMessage_temp();
  }

  regInputTemp.value = "";
  updateTownTemplate(townDataElemTemp.value)
}

// helper functions
function resetErrorMessages_temp() {
  errorImageTemp.innerHTML = "";
  filterMessageDisplayTemp.innerHTML = "";
}

function displayAddedMessage_temp() {
  messageDisplayTemp.classList.add("message_container");
  messageDisplayTemp.innerHTML = regInstanceTemp.getMessage();
  function timeout() {
    messageDisplayTemp.classList.remove("message_container");
    messageDisplayTemp.innerHTML = "";
  }
  setTimeout(timeout, 2000);
}

function inputValid_temp() {
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

function clear_temp() {
  const userConfirm = confirm("Are you sure you want to clear all data?");

  if (userConfirm) {
    localStorage.clear();
    errorMessageTemp.innerHTML = "";
    regDisplayTemp.innerHTML = "";
    regInputTemp.value = "";
    townDataElemTemp.value = "Select Town";
    localStorage.setItem("regNumTemp", JSON.stringify([]));
    regInstanceTemp.setSavedArr([]);
    resetErrorMessages_temp();
  }
}

//  filters towns from the drop box
function selectTown_temp() {
  regInstanceTemp.setLocationValue(townDataElemTemp.value);
  regInstanceTemp.filterReg();
  const filteredArr = regInstanceTemp.getFilteredArr();
  const filterMessage = regInstanceTemp.filteredMessage();
  filterMessageDisplayTemp.innerHTML = filterMessage;
  localStorage.setItem("selectedTown", townDataElemTemp.value);

  if (filteredArr.length === 0) {
    errorImageTemp.innerHTML = '<img src="./images/not_found.svg" width="200"/>';
  } else {
    errorImageTemp.innerHTML = "";
  }
  displayFilteredArray_temp(filteredArr)
  updateTownTemplate(townDataElemTemp.value)
}

function displayFilteredArray_temp(filteredArr) {
  regDisplayTemp.innerHTML = "";
  if (filteredArr) {
    filteredArr.forEach((reg) => {
      appendRegToNumberList_temp(reg);
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
      { name: "Select Town", selected: selectedValue === "Select Town" },
      {
        name: "Cape Town", selected: selectedValue === "Cape Town"
      },
      {
        name: "Stellenbosch", selected: selectedValue === "Stellenbosch"
      },
      {
        name: "Paarl", selected: selectedValue === "Paarl"
      },
    ],
  };
  const userDataHTML = registrationTemplate(townData);

  townDataElemTemp.innerHTML = userDataHTML;
  townDataElemTemp.value = selectedValue
 
}

function updateRegRemplate() {
  const templateSource = document.querySelector("#regDisplayTemplate").innerHTML;
}


document.addEventListener("DOMContentLoaded", function () {
  const savedTownValue = localStorage.getItem("selectedTown") || "Select Town";
  updateTownTemplate(savedTownValue);
  displayRegNumbersOnRefresh_temp();
  selectTown_temp()
  
});

townDataElemTemp.addEventListener("change", selectTown_temp);
clearBtnTemp.addEventListener("click", clear_temp);
addRegNumBtnTemp.addEventListener("click", registrationNumAdd_temp);
regInputTemp.addEventListener("input", inputValid_temp);
