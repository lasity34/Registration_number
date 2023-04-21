


function registrationNumber() {

    let regInput = "";
    const errorMessage = ""
    const regex = /^[a-zA-Z0-9]*$/

    function setValueInput(input) {
        regInput = input.replace(/[a-zA-Z]/g, (letter) => letter.toUpperCase())
    }


    function testValueInput() {
        if (!regex.test(regInput)) {
            errorMessage = "May only contain numbers and strings"
        } else if (4 >= regInput.length) {
            errorMessage = "input is too short"
        } else if (regInput.length <= 10) {
            errorMessage = "input is too long"
        }
    }


    

    function getValueInput() {
        if (regex.test(regInput) && 4 >= regInput.length <= 10) {
            return regInput
        } else {
           return false
        }
        
    }


    return {
       setValueInput,
       getValueInput,
        testValueInput
    }
}