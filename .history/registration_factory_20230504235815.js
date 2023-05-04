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
  function setSavedArr(registrationArray) {
    locationArr = registrationArray;
  }

  // filters locations and sets string names

  function getLocationFromPrefix(prefix) {
    const locations = {
      CL: "Stellenbosch",
      CA: "Cape town",
      CJ: "Paarl",
    };
   
    return locations[prefix];
  }

  // Creates new object

  function addRegistrationNumber() {
  
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

  // tests for error messagese

  function testValueInput() {
    if (regInput.length < 5) {
      errorMessage = "Too short";
    } else if (!firstTwoLetterCheck.test(regInput)) {
      errorMessage = "only First 2 must be letters";
    } else if (
      !["CJ","CL", "CA"].includes(regInput.substring(0, 2))
    ) {
      errorMessage = "Has to start with CA, CJ or CL";
    } else if (regInput.length >= 10) {
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
    console.log('filteredArr:', filteredArr);
  }

  //  this is a filter for just the town groups

  function filteredMessage() {

    let filterMessage = "";
    if (filteredArr.length === 0 && locationVal === "select_town") {
       filterMessage = `The are no reg numbers for any town`;
    } else if (filteredArr.length === 0) {

       filterMessage = `The are no reg numbers for ${locationVal}`;
    }
    
    return filterMessage
    
  }

  // this will get the value of the groups

  function getValueInput() {
    if (regInput.length >= 5 &&
        regInput.length < 10 &&
        !locationArr.some((reg) => reg.reg === regInput) &&
        ["CJ","CL","CA"].includes(regInput.substring(0, 2)) && firstTwoLetterCheck.test(regInput)
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

 
  function getMessage() {
    return addedMessage;
  }

  return {
    setValueInput,
    setLocationValue,
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
