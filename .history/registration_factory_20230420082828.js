


function registrationNumber() {

    let regInput = "";
    const regex = /^[a-zA-Z0-9]*$/

    function setValueInput(input) {
        regInput = input
    }


    

    function getValueInput() {
        if (regex.test(regInput)) {
            return regInput
        } else {
            false
        }
        
    }


    return {
       setValueInput,
       getValueInput
        
    }
}