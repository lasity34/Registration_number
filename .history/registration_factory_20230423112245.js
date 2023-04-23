function registrationNumber() {
  let regInput;
  let errorMessage = "";
  let errorMessage1 = '';
  let errorMessage2 = ''
  let errorMessage3 = ''
  const regexNumLet = /^[a-zA-Z0-9]*$/;

  function setValueInput(input) {
    regInput = input.replace(/[a-zA-Z]/g, (letter) => letter.toUpperCase());
  }

  function testValueInput() {
    if (!regexNumLet.test(regInput)) {
      errorMessage = "Only contain numbers and strings";
    } else {
      errorMessage = ""
    }
     if (4 >= regInput.length) {
      errorMessage1 = "Too short";
    } else {
      errorMessage1 = ""
    }
     if (regInput.length >= 7) {
      errorMessage1 = "Too long";
    } else {
      errorMessage = ""
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

  function getErrorMessage1() {
    return errorMessage1;
  }
  function getErrorMessage2() {
    return errorMessage2;
  }

  return {
    setValueInput,
    getValueInput,
    testValueInput,
    getErrorMessage,
    getErrorMessage1,
    getErrorMessage2
  };
}
