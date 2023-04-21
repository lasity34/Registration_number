const addRegNumBtn = document.querySelector(".add_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");

const regInstance = registrationNumber();

function registrationNumAdd() {
  const newLi = document.createElement("li");
  const regValue = regInput.value;
  const textNode = document.createTextNode(regValue);
  
  regInstance.setValueInput(regValue);

  newLi.appendChild(textNode);

  document.body.insertBefore(regDisplay);
}

addRegNumBtn.addEventListener("click", registrationNumAdd);
