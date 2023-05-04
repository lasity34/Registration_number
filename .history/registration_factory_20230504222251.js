function registrationNumber() {
  let regInput = "";
  let errorMessage = "";
  let addedMessage = "";
  let locationVal = "";
  const regexNumLet = /^[a-zA-Z0-9]*$/;
  const firstTwoLetterCheck = /^[a-zA-Z]{2,3}[a-zA-Z0-9]?[0-9]*(-[0-9]*)?$/;

  let locationArr = [];
  let filteredArr = [];

  //  input will make all letters uppercase
  //  remove all whitespace inbetween and around

  function setValueInput(input) {
    regInput = input
      .replace(/[a-zA-Z]/g, (letter) => letter.toUpperCase())
      .replace(/\s+/g, "")
      .trim();
  }

  //  gets location value
  function setLocationValue(location) {
    locationVal = location;
  }

  //  local storage saved
  function setSavedArr(arr) {
    locationArr = arr;
  }

  // filters locations and sets string names

  function getLocationFromPrefix(prefix) {
    const locations = {
      CL: "stellenbosch",
      CA: "cape town",
      CJ: "paarl",
    };
    return locations[prefix];
  }

  // Creates new object

  function addRegistrationNumber() {
    // ...
    const location = getLocationFromPrefix(regInput.substring(0, 2));
    if (location && !locationArr.some((reg) => reg.reg === regInput)) {
      locationArr.push({
        reg: regInput,
        count: 0,
        regLocation: regInput.substring(0, 2),
        location: location,
      });
      addedMessage = `Licence plate has been added to ${location}`;
      return true;
    }
    return false;
  }

  // tests for error messages

  function testValueInput() {
    if (regInput.length < 5) {
      errorMessage = "Too short";
    } else if (!firstTwoLetterCheck.test(regInput)) {
      errorMessage = "only First 2 must be letters";
    } else if (
      ["CJ","CL", "CA"].includes(regInput)
    ) {
      errorMessage = "Has to start with CA, CJ or Cl";
    } else if (regInput.length > 10) {
      errorMessage = "Too long";
    } else if (locationArr.some((reg) => reg.reg === regInput)) {
      errorMessage = "Already used";
    } else {
      errorMessage = "";
    }
  }

  // this will filter towns in their groups

  function filterReg() {
    if (locationVal === "select_town") {
      filteredArr = locationArr.map((reg) => reg.reg);
    } else {
      filteredArr = locationArr
        .filter((reg) => reg.location === locationVal)
        .map((reg) => reg.reg);
    }
  }

  //  this is a filter for just the town groups

  function filteredMessage() {

    let filterMessage = "";
    if (filteredArr.length === 0 && locationVal === "select_town") {
       filterMessage = `The are no reg numbers for any town`;
    } else if (filteredArr.length === 0) {

       filterMessage = `The are no reg numbers for ${
        locationVal.charAt(0).toUpperCase() + locationVal.slice(1)
      }`;
    }
    
    return filterMessage
    
  }

  // this will get the value of the groups

  function getValueInput() {
    if (
      (5 <= regInput.length &&
        10 > regInput.length &&
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

  function getLocationValue() {
    return locationVal;
  }

  function getMessage() {
    return addedMessage;
  }

  return {
    setValueInput,
    setLocationValue,
    getLocationValue,
    getValueInput,
    testValueInput,
    getErrorMessage,
    addRegistrationNumber,
    getMessage,
    filterReg,
    getArr,
    getFilteredArr,
    setSavedArr,
    filteredMessage,
  };
}
