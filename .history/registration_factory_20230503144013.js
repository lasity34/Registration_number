function registrationNumber() {
  let regInput = "";
  let errorMessage = "";
  let locationVal = "";
  const regexNumLet = /^[a-zA-Z0-9]*$/;
  const firstTwoLetterCheck = /^\w{2,3}[\w\s-]*\d{3,7}/;


  let filterMessage = "";
  let locationArr = [];
  let filteredArr = [];

  function setValueInput(input) {
    regInput = input.replace(/[a-zA-Z]/g, (letter) => letter.toUpperCase()).replace(/\s+/g, '').trim()
 
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

  function getLocationValue() {
    return locationVal
  }

  function setSavedArr(arr) {
    locationArr = arr;
  }

  // tests for error messages

  function testValueInput() {
    if (5 > regInput.length) {
      errorMessage = "Too short";
    } else if (!firstTwoLetterCheck.test(regInput)) {
      errorMessage = "only First 2 must be letters";
    } else if (
      !regInput.startsWith("CJ") &&
      !regInput.startsWith("CL") &&
      !regInput.startsWith("CA")
    ) {
      errorMessage = "Has to start with CA, CJ or Cl";
    } else if (7 < regInput.length) {
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
    if ((filteredArr.length === 0 && locationVal === "select_town")) {
      return (filterMessage = `The are no reg numbers for any town`);
    } else if ((filteredArr.length === 0)) {
      return (filterMessage = `The are no reg numbers for ${locationVal.charAt(0).toUpperCase() + locationVal.slice(1)}`);
    } else {
      return (filterMessage = "");
    }
    
  }
  

  function getValueInput() {
    if (
      (
        5 <= regInput.length &&
        7 > regInput.length &&
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
