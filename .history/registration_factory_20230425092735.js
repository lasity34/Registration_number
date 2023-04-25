function registrationNumber() {
  let regInput = "";
  let errorMessage = "";
  let locationVal = "";
  const regexNumLet = /^[a-zA-Z0-9]*$/;

  
  
  let locationArr = [];
  let filteredArr = [];

  function setValueInput(input) {
    regInput = input.replace(/[a-zA-Z]/g, (letter) => letter.toUpperCase());
  }

  function setLocationValue(location) {
    locationVal = location;
  }

  function setSavedArr(arr) {
    locationArr = arr;
  }

  // tests for error messages

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

  // Creates new object

  function callRegNum() {
    if (!locationArr.some((reg) => reg.reg === regInput)) {
      
    
    if (regInput.startsWith("CAW")) {
      locationArr.push({
        reg: regInput,
        count: 0,
        regLocation: "CAW",
        location: "george",
      });
    } else if (regInput.startsWith("CA")) {
      locationArr.push({
        reg: regInput,
        count: 0,
        regLocation: "CA",
        location: "cape_town",
      });
    } else if (regInput.startsWith("CJ")) {
      locationArr.push({
        reg: regInput,
        count: 0,
        regLocation: "CJ",
        location: "paarl",
      });
    }
    return true;
  } else {
    return false
  }
}

  function filterReg() {
    filteredArr = locationArr
      .filter((reg) => reg.location === locationVal)
      .map((reg) => reg.reg);
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
      return undefined
    }
  }

  function getArr() {
    return  locationArr
  }

  function getFilteredArr() {
    return filteredArr;
  }

  function getErrorMessage() {
    return errorMessage;
  }

  return {
    setValueInput,
    setLocationValue,
    getValueInput,
    testValueInput,
    getErrorMessage,
    callRegNum,
    filterReg,
    getArr,
    getFilteredArr,
    setSavedArr,
  };
}
