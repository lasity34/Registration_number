const addRegNumBtn = document.querySelector(".add_btn");
const clearBtn = document.querySelector(".clear_btn")
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");
const errorMessage = document.querySelector("#error");
const validator = document.querySelector(".valid");
const townSelect = document.querySelector("#dropdown")

const regInstance = registrationNumber();
let regArr = [];

function registrationNumAdd() {
  const regValue = regInput.value;
  regInstance.setValueInput(regValue);
  const reg = regInstance.getValueInput();

  
  if (reg) {
    regInstance.callRegNum();
    regArr = regInstance.getObj();
    localStorage.setItem("regNum", JSON.stringify(regArr));
    const newLi = document.createElement("li");
    newLi.textContent = reg;
    regDisplay.appendChild(newLi);
    regInput.value = ""
  }
}


if (localStorage.getItem("regNum")) {
  regArr = JSON.parse(localStorage.getItem("regNum"));
  if (Array.isArray(regArr)) {
    regArr.forEach((reg) => {
      const newLi = document.createElement("li");
      newLi.textContent = reg.reg;
      regDisplay.appendChild(newLi);
    });
  }
 
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
    errorMessage.innerHTML = ""
  }
}

function clear() {
    localStorage.clear
    errorMessage.innerHTML = ""
    regDisplay.innerHTML = ""
    regInput.value = ""
}

function moveDown() {
  alert('Dropdown options changed!');
  document.querySelector('.btn_container').style.paddingTop = '3em';
}

// townSelect.addEventListener("click", moveDown)
clearBtn.addEventListener("click", clear)
addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
