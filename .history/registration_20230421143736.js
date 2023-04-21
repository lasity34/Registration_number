
const addRegNumBtn = document.querySelector(".add_btn")
const regInput = document.querySelector(".form__input")
const regDisplay = document.querySelector(".reg_display")

const regInstance = registrationNumber()

function registrationNumAdd() {

    const regValue = regInput.value

    regInstance.setValueInput(regValue)

   const newLi = document.createElement("li")

   const textNode = document.createTextNode(regInstance.getValueInput())

    newLi.appendChild(textNode)

    document.body.insertBefore(regDisplay)

}


addRegNumBtn.addEventListener("click", registrationNumAdd)