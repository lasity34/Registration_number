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
    if (regObj[regInput] === undefined) {
      regObj[regInput] = 0;
    }
  }

  function setLocalStorage() {
    localStorage.setItem("numItem", JSON.stringify(greetCount));
  }

  function getLocalStorage() {
    greetCount = Number(localStorage.getItem("numItem"));
  }

  function getValueInput() {
    if (
      regexNumLet.test(regInput) &&
      7 < regInput.length &&
      9 > regInput.length &&
      regObj[regInput] === undefined
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
    setLocalStorage,
    getLocalStorage
  };
}
