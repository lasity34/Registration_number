const addRegNumBtn = document.querySelector(".add_btn");
const clearBtn = document.querySelector(".clear_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");
const errorMessage = document.querySelector("#error");
const validator = document.querySelector(".valid");
const townSelect = document.querySelector("#dropdown");

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
  const regValue = regInput.value;

  regInstance.setValueInput(regValue);
  const reg = regInstance.getObj();

  regInstance.filterReg();
  const filteredArr = regInstance.getFilteredArr();


  if (reg) {
    regInstance.callRegNum();
    const newRegArr = regInstance.getObj();
    console.log(newRegArr);
    regArr.push(...newRegArr);
    const storedRegArr = [...regArr];
    localStorage.setItem("regNum", JSON.stringify(storedRegArr));
    const newLi = document.createElement("li");
    newLi.textContent = JSON.stringify(reg.reg);
    newLi.textContent = JSON.stringify(filteredArr.reg);
    regDisplay.appendChild(newLi);
    regInput.value = "";
  }

  location.reload();
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

townSelect.addEventListener("click", moveDown);
clearBtn.addEventListener("click", clear);
addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
