function registrationNumber() {
  let regInput = "";
  const errorMessage = "";
  const regexNumLet = /^[a-zA-Z0-9]*$/;
  const regexTwoChar = /^[a-zA-Z]{2}|[a-zA-Z]{2}$/;

  function setValueInput(input) {
    regInput = input.replace(/[a-zA-Z]/g, (letter) => letter.toUpperCase());
  }

  function testValueInput() {
    if (!regexNumLet.test(regInput)) {
      errorMessage = "May only contain numbers and strings";
    } else if (4 >= regInput.length) {
      errorMessage = "input is too short";
    } else if (regInput.length >= 10) {
      errorMessage = "input is too long";
    } else if (!regexNumLet.test(regInput)) {
      errorMessage = "First 2 or last 2 characters need to be letters "
    }
  }

  function getValueInput() {
    if (regexNumLet.test(regInput) && regexTwoChar.test(regInput) && 4 <= regInput.length && regInput.length <= 7) {
      return regInput;
    } else {
      return false;
    }
  }

  return {
    setValueInput,
    getValueInput,
    testValueInput,
  };
}
