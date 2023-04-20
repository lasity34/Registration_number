


function registrationNumber() {

    let regInput = "";


    function setValueInput(input) {
        regInput = input
    }

    function getValueInput() {
        return regInput
    }


    return {
       setValueInput,
       getValueInput
        
    }
}