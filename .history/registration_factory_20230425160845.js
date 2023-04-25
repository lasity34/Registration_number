function registrationNumber() {
  let regInput = "";
  let errorMessage = "";
  let locationVal = "";
  const regexNumLet = /^[a-zA-Z0-9]*$/;
  const firstTwoLetterCheck = /^\w{2}\d+$/;
  let filterMessage = "";
  let locationArr = [];
  let filteredArr = [];

  function setValueInput(input) {
    regInput = input.replace(/[a-zA-Z]/g, (letter) => letter.toUpperCase());
  }

  // Creates new object

  function callRegNum() {
    if (!locationArr.some((reg) => reg.reg === regInput)) {
      if (regInput.startsWith("CL")) {
        locationArr.push({
          reg: regInput,
          count: 0,
          regLocation: "CL",
          location: "stellenbosch",
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
      return false;
    }
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
    } else if (!firstTwoLetterCheck.test(regInput)) {
      errorMessage = "only First 2 must be letters";
    } else if (
      !regInput.startsWith("CJ") &&
      !regInput.startsWith("CL") &&
      !regInput.startsWith("CA")
    ) {
      errorMessage = "This is not a valid reg number";
    } else if (9 < regInput.length) {
      errorMessage = "Too long";
    } else if (locationArr.some((reg) => reg.reg === regInput)) {
      errorMessage = "Already used";
    } else {
      errorMessage = "";
    }
  }

  function filterReg() {
    if (locationVal === "select_town") {
      filteredArr = locationArr.map((reg) => reg.reg);
    } else {
      filteredArr = locationArr
        .filter((reg) => reg.location === locationVal)
        .map((reg) => reg.reg);
    }
  }

  function filteredMessage() {
    if ((filteredArr = [] && locationVal)) {
      return (filterMessage = `The are no reg numbers`);
    } else if ((filteredArr = [])) {
      return (filterMessage = `The are no reg numbers for ${locationVal}`);
    }
  }

  function getValueInput() {
    if (
      (regexNumLet.test(regInput) &&
        7 <= regInput.length &&
        9 > regInput.length &&
        !locationArr.some((reg) => reg.reg === regInput) &&
        regInput.startsWith("CJ")) ||
      regInput.startsWith("CL") ||
      (regInput.startsWith("CA") && firstTwoLetterCheck.test(regInput))
    ) {
      return regInput;
    } else {
      return undefined;
    }
  }

  function getArr() {
    return locationArr;
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
    filteredMessage,
  };
}
