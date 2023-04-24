const addRegNumBtn = document.querySelector(".add_btn");
const clearBtn = document.querySelector(".clear_btn");
const regInput = document.querySelector(".form__input");
const regDisplay = document.querySelector(".reg_display");
const errorMessage = document.querySelector("#error");
const validator = document.querySelector(".valid");
const townSelect = document.querySelector("#dropdown");

const regInstance = registrationNumber();


let regArr = JSON.parse(localStorage.getItem("regNum")) || []
regInstance.setLocationValue(townSelect.value)
if (Array.isArray(regArr)) {
  regArr.forEach((reg) => {
    const newLi = document.createElement("li");
    newLi.textContent = reg.reg;
    regDisplay.appendChild(newLi);
  });
}
regInstance.filterReg()
console.log(regInstance.getLocationObj())

function registrationNumAdd() {
 
  const regValue = regInput.value;

  regInstance.setValueInput(regValue);
  const reg = regInstance.getObj()
  console.log(reg)
  if (reg) {
    regInstance.callRegNum();
    const newRegArr = regInstance.getLocationObj ? regInstance.getLocationObj : regInstance.getObj()
    regArr.push(...newRegArr)
    const storedRegArr = [...regArr]
    localStorage.setItem("regNum", JSON.stringify(storedRegArr));
    const newLi = document.createElement("li");
    newLi.textContent = JSON.stringify(reg.reg);
    regDisplay.appendChild(newLi);
    regInput.value = "";
  }

  location.reload()
  
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
    errorMessage.innerHTML = "";
  }
}

function clear() {
  localStorage.clear();
  errorMessage.innerHTML = "";
  regDisplay.innerHTML = "";
  regInput.value = "";
  regArr = []
}
 

function moveDown() {
  
    document.querySelector(".btn_container").style.paddingTop = "5em";
    
}

townSelect.addEventListener("click", moveDown);
clearBtn.addEventListener("click", clear);
addRegNumBtn.addEventListener("click", registrationNumAdd);
regInput.addEventListener("input", inputValid);
