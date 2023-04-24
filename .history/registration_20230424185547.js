const addRegNumBtn = document.querySelector(".add_btn");
const clearBtn = document.querySelector(".clear_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");
const errorMessage = document.querySelector("#error");
const validator = document.querySelector(".valid");
const townSelect = document.querySelector("#dropdown");
const town = document.querySelector(".town");

const regInstance = registrationNumber();

// global code

let regArr = JSON.parse(localStorage.getItem("regNum")) || [];
regInstance.setSavedArr(regArr);

regInstance.setLocationValue(townSelect.value);
if (Array.isArray(regArr)) {
  regArr.forEach((reg) => {
    const newLi = document.createElement("li");
    newLi.textContent = reg.reg;
    regDisplay.appendChild(newLi);
  });
}
regInstance.filterReg();

// add reg number

function registrationNumAdd() {
  // sett value

  const regValue = regInput.value;
  regInstance.setValueInput(regValue);
  const reg = regInstance.getObj();

  if (reg) {
    regInstance.callRegNum();
    const newRegArr = regInstance.getObj();
    regArr.push(...newRegArr);
    const storedRegArr = [...regArr];
    localStorage.setItem("regNum", JSON.stringify(storedRegArr));

    regInstance.filterReg();
    regInstance.getFilteredArr();
    console.log(regInstance.getFilteredArr())
    regDisplay.innerHTML = "";

    storedRegArr.forEach((reg) => {
      const newLi = document.createElement("li");
      newLi.textContent = reg.reg;
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
}

function moveDown() {
  document.querySelector(".btn_container").style.paddingTop = "5em";
}

function changeTown() {
  regInstance.callRegNum();
  regInstance.filterReg();
  const filteredArr = regInstance.getFilteredArr();
  console.log(filteredArr);
  regDisplay.innerHTML = "";
  if (filteredArr) {
    filteredArr.forEach((reg) => {
      const newLi = document.createElement("li");
      newLi.textContent = reg.reg;
      regDisplay.appendChild(newLi);
    });
  } else {
    regDisplay.innerHTML = "";
  }
}

changeTown()
town.addEventListener("click", changeTown);
townSelect.addEventListener("click", moveDown);
clearBtn.addEventListener("click", clear);
addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
