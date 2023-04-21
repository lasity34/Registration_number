const addRegNumBtn = document.querySelector(".add_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display")

function registrationNumAdd() {
  const newLi = document.createElement("li");
  const regValue = regInput.value;
  regInstance.setValueInput(regValue);


  newLi.textContent = regInstance.getValueInput();

  regDisplay.appendChild(newLi);
}
const regInstance = registrationNumber();

addRegNumBtn.addEventListener("click", registrationNumAdd);
