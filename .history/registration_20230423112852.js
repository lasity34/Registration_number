const addRegNumBtn = document.querySelector(".add_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");
const errorMessage = document.querySelector("#error");
const errorMessage1 = document.querySelector("#error1");
const errorMessage2 = document.querySelector("#error2");
const validator = document.querySelector(".valid")

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

  if (regInstance.getErrorMessage()) {
    errorMessage.innerHTML = regInstance.getErrorMessage();
    validator.classList.toggle("invalid")
  }
  if (regInstance.getErrorMessage1()) {
    errorMessage1.innerHTML = regInstance.getErrorMessage1();
    errorMessage.classList.toggle("invalid")
  }
  if (regInstance.getErrorMessage()) {
    errorMessage2.innerHTML = regInstance.getErrorMessage();
    errorMessage.classList.toggle("invalid")
  }
}

addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
