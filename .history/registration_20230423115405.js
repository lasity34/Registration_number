const addRegNumBtn = document.querySelector(".add_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");
const errorMessage = document.querySelector("#error");
const errorMessage1 = document.querySelector("#error1");
const errorMessage2 = document.querySelector("#error2");
const validator = document.querySelector(".valid");
const validator1 = document.querySelector(".valid1");
const validator2 = document.querySelector(".valid2");

function registrationNumAdd() {
  const regValue = regInput.value;
  regInstance.setValueInput(regValue);

  if (regInstance.getValueInput() === undefined) {
    return;
  } else {
    const newLi = document.createElement("li");
    newLi.textContent = regInstance.getValueInput();

    regDisplay.appendChild(newLi);
  }
}
const regInstance = registrationNumber();

function inputValid() {
  const regValue = regInput.value;
  regInstance.setValueInput(regValue);
  regInstance.testValueInput();
  errorMessage.innerHTML = "";
  errorMessage1.innerHTML = "";
  errorMessage2.innerHTML = "";

  if (regInstance.getErrorMessage() && regInstance.getErrorMessage != regInstance.getErrorMessage()) {
    errorMessage.innerHTML = regInstance.getErrorMessage();
    validator.classList.toggle("invalid");
  }
  if (regInstance.getErrorMessage1()) {
    errorMessage1.innerHTML = regInstance.getErrorMessage1();
    validator1.classList.toggle("invalid2");
  }
  if (regInstance.getErrorMessage2()) {
    errorMessage2.innerHTML = regInstance.getErrorMessage2();
    validator2.classList.toggle("invalid3");
  }
}

addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
