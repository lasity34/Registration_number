const addRegNumBtn = document.querySelector(".add_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");
const errorMessage = document.querySelector(".error")


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
    regInstance.setValueInput(regValue)
    regInstance.testValueInput()

    if(regInstance.getErrorMessage()) {
        errorMessage.innerHTML = regInstance.getErrorMessage()

    }

}

addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid)
