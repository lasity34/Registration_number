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
  const valid = regInstance.setValueInput(regValue);
  regInstance.testValueInput();
  errorMessage.innerHTML = "";
  

  if (regInstance.getErrorMessage()) {
    errorMessage.innerHTML = regInstance.getErrorMessage();
    validator.classList.add("invalid")
  } else {
    validator.classList.remove("invalid")
  }
  
}

addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
