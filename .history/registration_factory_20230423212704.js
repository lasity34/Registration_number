function registrationNumber() {
  let regInput;
  let errorMessage = "";
  const regexNumLet = /^[a-zA-Z0-9]*$/;
  const regArr = [];

  function setValueInput(input) {
    regInput = input.replace(/[a-zA-Z]/g, (letter) => letter.toUpperCase());
  }

  function testValueInput() {
    if (!regexNumLet.test(regInput)) {
      errorMessage = "numbers and letters only";
    } else if (7 > regInput.length) {
      errorMessage = "Too short";
    } else if (9 < regInput.length) {
      errorMessage = "Too long";
    } else if (regObj[regInput] === 0) {
      errorMessage = "Already used";
    } else {
      errorMessage = "";
    }
  }

  function callRegNum() {
    if (!)
  }

  
  function getValueInput() {
    if (
      regexNumLet.test(regInput) &&
      7 < regInput.length &&
      9 > regInput.length &&
      regObj[regInput] != 0
      ) {
        
        return regInput
      } else {
        return;
      }
    }

    function getObj() {
      return regObj
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
  getObj
  };
}
