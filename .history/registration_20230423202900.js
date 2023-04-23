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
  const regNum = regInstance.getValueInput();

  if (regNum === undefined) {
    return;
  }

  regInstance.callRegNum();
  localStorage.setItem("regNum", JSON.stringify(regInstance.regObj));

  const newLi = document.createElement("li");
  regMap = JSON.parse(localStorage.getItem("regNum"));
  newLi.textContent = regNum;

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
