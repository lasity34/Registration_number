


function registrationNumber() {

    let regInput = "";
    const regex = /^[a-zA-Z0-9]*$/

    function setValueInput(input) {
        regInput = input
    }


    function testRegex() {
        if (regex.test(regInput)) {
            getValueInput()
        }
    }

    function getValueInput() {
        return regInput
    }


    return {
       setValueInput,
       getValueInput
        
    }
}