const addRegNumBtn = document.querySelector(".add_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");
const errorMessage = document.querySelector("#error");
const validator = document.querySelector(".valid");

const regInstance = registrationNumber();
let regMap = {};

function registrationNumAdd() {
  const regValue = regInput.value;
  regInstance.setValueInput(regValue);
   regInstance.getValueInput();
   regMap = regInstance.getObj()

  if (regMap === undefined) {
    return;
  }

  regInstance.callRegNum();
  localStorage.setItem("regNum", JSON.stringify(regMap));

  const newLi = document.createElement("li");
  regMap = JSON.parse(localStorage.getItem("regNum"));
  newLi.textContent = JSON.stringify(regMap);

  regDisplay.appendChild(newLi);
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
  }
}

addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
