


function registrationNumber() {

    let regInput = "";
    const regex = /^[a-zA-Z0-9]*$/

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