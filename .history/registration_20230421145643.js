const addRegNumBtn = document.querySelector(".add_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");

const regInstance = registrationNumber();

function registrationNumAdd() {
  const newLi = document.createElement("li");
  const regValue = regInput.value;
  regInstance.setValueInput(regValue);
console.log(typeof regInstance.getValueInput())
  const textNode = document.createTextNode(regInstance.getValueInput());

  
  newLi.appendChild(textNode);
  regDisplay.appendChild(newLi);
}

addRegNumBtn.addEventListener("click", registrationNumAdd);
