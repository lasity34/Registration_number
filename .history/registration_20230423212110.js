const addRegNumBtn = document.querySelector(".add_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");
const errorMessage = document.querySelector("#error");
const validator = document.querySelector(".valid");

const regInstance = registrationNumber();
let regArr = [];

function registrationNumAdd() {
  const regValue = regInput.value;
  regInstance.setValueInput(regValue);
  const reg = regInstance.getValueInput();
  

  if (reg) {
    regInstance.callRegNum();
    regArr = regInstance.getObj();
    localStorage.setItem("regNum", JSON.stringify(regMap));
    
  }

  
  
  
  regMap = JSON.parse(localStorage.getItem("regNum"));
  console.log(regMap)
  for (const regNum in regMap) {
      const newLi = document.createElement("li");
      newLi.textContent = regNum;
      regDisplay.appendChild(newLi);
    }
    
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
