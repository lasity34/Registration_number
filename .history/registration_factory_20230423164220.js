function registrationNumber() {
  let regInput;
  let errorMessage = "";
  const regexNumLet = /^[a-zA-Z0-9]*$/;
  const regObj = {};

  function setValueInput(input) {
    regInput = input.replace(/[a-zA-Z]/g, (letter) => letter.toUpperCase());
  }

  function testValueInput() {
    if (!regexNumLet.test(regInput)) {
      errorMessage = "May only contain numbers and strings";
    } else if (7 != regInput.length) {
      errorMessage = "Only 7 charcters";
    }else if (regObj[regInput] === 0) {
      errorMessage = "Already used"
    }
    else {
      errorMessage = "";
    }
  }

  function callRegNum() {
    if (regObj[regInput] === undefined) {
      regObj[regInput] = 0;
    }
  }

  function getValueInput() {
    if (
      regexNumLet.test(regInput) &&
      7 === regInput.length &&
      regObj[regInput] === 0
    ) {
      return regInput;
    } else {
      return;
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
    callRegNum,
  };
}
