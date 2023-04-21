const addRegNumBtn = document.querySelector(".add_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");

const regInstance = registrationNumber();

function registrationNumAdd() {
  const newLi = document.createElement("li");
  const regValue = regInput.value;

  const textNode = document.createTextNode(regInstance.getValueInput());

  regInstance.setValueInput(regValue);
  
  newLi.appendChild(textNode);
  regDisplay.appendChild(newLi);
}

addRegNumBtn.addEventListener("click", registrationNumAdd);
