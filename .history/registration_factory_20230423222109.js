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
    } else if (regArr.some((reg) => reg.reg === regInput)) {
      errorMessage = "Already used";
    } else {
      errorMessage = "";
    }
  }

  function callRegNum() {
    if (!regArr.some((reg) => reg.reg === regInput)) {
      regArr.push({ reg: regInput, count: 0 });
    }
    return false
  }

  function getValueInput() {
    if (
      regexNumLet.test(regInput) &&
      7 <= regInput.length &&
      9 > regInput.length &&
      !regArr.some((reg) => reg.reg === regInput)
    ) {
      return regInput;
    } else {
      return;
    }
  }

  function getObj() {
    return regArr;
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
    getObj,
  };
}
