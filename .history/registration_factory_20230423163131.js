function registrationNumber() {
  let regInput;
  let errorMessage = "";
  const regexNumLet = /^[a-zA-Z0-9]*$/;
  const regObj = {}

  function setValueInput(input) {
    regInput = input.replace(/[a-zA-Z]/g, (letter) => letter.toUpperCase());
  }

  function testValueInput() {
    if (!regexNumLet.test(regInput)) {
      errorMessage = "May only contain numbers and strings";
    } else if (4 >= regInput.length) {
      errorMessage = "input is too short";
    } else if (regInput.length >= 7) {
      errorMessage = "input is too long";
    } else {
      errorMessage = ""
    }
  }

  function callRegNum() {
    if (regObj[regInput] === undefined ) {
      
     regObj[regInput] = 0;
    }
  }

  function getValueInput() {
    if (
      regexNumLet.test(regInput) &&
      4 <= regInput.length &&
      regInput.length <= 7
    ) {
      return regInput;
    } else {
        return 
    }
  }

  function getErrorMessage() {
    return errorMessage;
  }

  return {
    setValueInput,
    getValueInput,
    testValueInput,
    getErrorMessage,
  };
}
