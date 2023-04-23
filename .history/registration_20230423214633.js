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
    localStorage.setItem("regNum", JSON.stringify(regArr));

    
    regArr.forEach((reg) => {
      const newLi = document.createElement("li");
      newLi.textContent = reg.reg;
      regDisplay.appendChild(newLi);
    });
  }
}

regArr = JSON.parse(localStorage.getItem("regNum"));

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
