function registrationNumber() {
  let regInput;
  let errorMessage = "";
  const regexNumLet = /^[a-zA-Z0-9]*$/;
  const regArr = [];
 let locationVal = ""
 let locationArr = []

  function setValueInput(input) {
    regInput = input.replace(/[a-zA-Z]/g, (letter) => letter.toUpperCase());
  }

  function setLocationValue(location) {
    locationVal = location
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
    } else if (
      !regInput.startsWith("CJ") &&
      !regInput.startsWith("CAW") &&
      !regInput.startsWith("CA")
    ) {
      errorMessage = "This is not a valid reg number";
    } else {
      errorMessage = "";
    }
  }

  function callRegNum() {
    if (!regArr.some((reg) => reg.reg === regInput)) {
      if (regInput.startsWith("CAW")) {
        regArr.push({ reg: regInput, count: 0, location: "CAW" });
      } else if (regInput.startsWith("CA")) {
        regArr.push({ reg: regInput, count: 0, location: "CA" });
      } else if (regInput.startsWith("CJ")) {
        regArr.push({ reg: regInput, count: 0, location: "CJ" });
      }
    }
    return false;
  }

  function filterReg() {
    regArr.filter((reg) => (
      if (locationVal === "cape town") {

      }
    ));
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
