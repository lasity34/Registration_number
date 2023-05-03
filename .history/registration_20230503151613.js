const addRegNumBtn = document.querySelector(".add_btn");
const clearBtn = document.querySelector(".clear_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");
const errorMessage = document.querySelector("#error");
const validator = document.querySelector(".valid");
const townList = document.querySelector("#dropdown");
const town = document.querySelector(".town");

const filterMessageDisplay = document.querySelector(".filter_message");
const errorImage = document.querySelector(".error_image");

const regInstance = registrationNumber();


// global code




let regArr = JSON.parse(localStorage.getItem("regNum")) || [];
regInstance.setSavedArr(regArr);
regInstance.setLocationValue(townList.value);

if (Array.isArray(regArr)) {
  regArr.forEach((reg) => {
    const newLi = document.createElement("li");
    newLi.textContent = reg.reg;
    regDisplay.appendChild(newLi);
  });
}

// add reg number

function registrationNumAdd() {
  // set value

  const regValue = regInput.value;

  regInstance.setValueInput(regValue.trim());
  const reg = regInstance.getValueInput();

  if (reg) {
    if (regInstance.callRegNum()) {
      const storedRegArr = regInstance.getArr();
      localStorage.setItem("regNum", JSON.stringify(storedRegArr));
    }

    regInstance.filterReg();
    regDisplay.innerHTML = "";
    const newRegArr = regInstance.getFilteredArr() || [];
    newRegArr.forEach((reg) => {
      const newLi = document.createElement("li");
      newLi.textContent = reg;
      regDisplay.appendChild(newLi);
    });
  }

  regInput.value = "";
}

// error code input

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
  localStorage.clear();
  errorMessage.innerHTML = "";
  regDisplay.innerHTML = "";
  regInput.value = "";
  regArr = [];
  townSelect.value = "select_town";
  localStorage.setItem("regNum", JSON.stringify([]));
  regInstance.setSavedArr([]);
}

function selectTown() {
  document.querySelector(".clear").style.paddingTop = "5em";
}

function changeTown() {
  regInstance.filterReg();
  
  const filteredArr = regInstance.getFilteredArr();
 
  const filterMessage = regInstance.filteredMessage();
 
  if (filteredArr.length === 0) {
    errorImage.innerHTML = '<img src="./images/not_found.svg" width="200"/>';
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


town.addEventListener("click", changeTown);
townList.addEventListener("click", selectTown);
clearBtn.addEventListener("click", clear);
addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
