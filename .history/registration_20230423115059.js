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
  validator.classList.remove("invalid");
  validator.classList.add("valid");
  validator.classList.remove("invalid1");
  validator.classList.add("valid1");
  validator.classList.remove("invalid2");
  validator.classList.add("valid2");


  if (regInstance.getErrorMessage()) {
    errorMessage.innerHTML = regInstance.getErrorMessage();
    validator.classList.remove("valid");
    validator.classList.add("invalid");
  } 
  if (regInstance.getErrorMessage1()) {
    errorMessage1.innerHTML = regInstance.getErrorMessage1();
    validator.classList.remove("valid1");
    validator.classList.add("invalid1");
  }
  if (regInstance.getErrorMessage2()) {
    errorMessage2.innerHTML = regInstance.getErrorMessage2();
  
    validator.classList.remove("valid2");
    validator.classList.add("invalid2");
  }
}

addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
