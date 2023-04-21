
const addRegNumBtn = document.querySelector(".add_btn")
const regInput = document.querySelector(".form__input")
const regDisplay = document.querySelector(".reg_display")

const regInstance = registrationNumber()

function registrationNumAdd() {

    const regValue = regInput.value

    regInstance.setValueInput(regValue)

   const newLi = document.createElement("li")

    newLi.appendChild(regInstance.getValueInput())

    document.body.insertBefore(regDisplay)

}


addRegNumBtn.addEventListener("click", registrationNumAdd)