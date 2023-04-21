


function registrationNumber() {

    let regInput = "";
    const errorMessage = ""
    const regex = /^[a-zA-Z0-9]*$/

    function setValueInput(input) {
        regInput = input
    }


    function testValueInput() {
        if (!regex.test(regInput)) {
            errorMessage = "May only contain numbers and strings"
        } else if (4 > regInput.length > 10) {
            errorMessage = "characters have to be more than 4 and less than 10"
        }
    }


    

    function getValueInput() {
        if (regex.test(regInput)) {
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