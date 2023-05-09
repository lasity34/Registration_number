document.addEventListener("DOMContentLoaded", function () {
  const addRegNumBtnTemp = document.querySelector(".add_btn_temp");
  const clearBtnTemp = document.querySelector(".clear_btn_temp");
  const regInputTemp = document.querySelector(".form__input_temp");
  const regDisplayTemp = document.querySelector(
    "#reg_display_container_template"
  );
  const errorMessageTemp = document.querySelector("#error_temp");
  const validatorTemp = document.querySelector(".valid_temp");
  const townDataElemTemp = document.querySelector("#town_select_temp");
  const messageDisplayTemp = document.querySelector(".added_item_temp");
  
  //  Instance
  const regInstanceTemp = registrationNumber_temp();

  init();

  function init() {
    displayRegNumbersOnRefresh_temp();
    updateTownTemplate(getSavedTownValue())
    addEventListener()
  }
  // main functions

  function displayRegNumbersOnRefresh_temp() {
    let registrationNumbersArray =
      JSON.parse(localStorage.getItem("regNumTemp")) || [];
    regInstanceTemp.setSavedArr(registrationNumbersArray);
    regInstanceTemp.setLocationValue(townDataElemTemp.value);
    regInstanceTemp.filterReg();
    displayFilteredArray_temp(regInstanceTemp.getFilteredArr());
    updateRegTemplate(regInstanceTemp.getValueInput())
  }

  function registrationNumAdd_temp() {
  
    const regValue = regInputTemp.value.trim();
    regInstanceTemp.setValueInput(regValue);
    const reg = regInstanceTemp.getValueInput();

    if (reg && regInstanceTemp.addRegistrationNumber()) {
      UpdateLocalStorage();
      regInstanceTemp.filterReg();
      displayFilteredArray_temp(regInstanceTemp.getFilteredArr());
      displayAddedMessage_temp();
    }

    regInputTemp.value = "";
    updateTownTemplate(townDataElemTemp.value);
  }

  // helper functions
  function UpdateLocalStorage() {
    const storedRegArr = regInstanceTemp.getArr();
    localStorage.setItem("regNumTemp", JSON.stringify(storedRegArr));
  }

  function getSavedTownValue() {
    return localStorage.getItem("selectedTown") || "Select Town";
  }

  function appendRegToNumberList_temp(regNumber) {
    const newLi = document.createElement("li");
    newLi.innerHTML = regNumber;
    newLi.classList.add("reg_list");

    let regDisplayElement = regDisplayTemp.querySelector(".reg_display_temp");
    if (!regDisplayElement) {
      regDisplayElement = document.createElement("ul");
      regDisplayElement.classList.add("reg_display_temp");
      regDisplayTemp.appendChild(regDisplayElement);
    }

    regDisplayElement.appendChild(newLi);

    removeEmptyRegListItems();
  }

  function removeEmptyRegListItems() {
    const regListItems = regDisplayTemp.querySelectorAll(".reg_list");

    regListItems.forEach((item) => {
      if (item.innerHTML.trim() === "") {
        item.remove();
      }
    });
  }

  function renderRegDisplayTempContainer(filteredArr) {
    regDisplayTemp.innerHTML = updateRegTemplate(filteredArr);
  }


  function displayAddedMessage_temp() {
    messageDisplayTemp.classList.add("message_container");
    messageDisplayTemp.innerHTML = regInstanceTemp.getMessage();
    function timeout() {
      messageDisplayTemp.classList.remove("message_container");
      messageDisplayTemp.innerHTML = "";
    }
    setTimeout(timeout, 2000);
  }

  function inputValid_temp() {
    const regValue = regInputTemp.value;
    regInstanceTemp.setValueInput(regValue);
    regInstanceTemp.testValueInput();

    if (regInstanceTemp.getErrorMessage()) {
      errorMessageTemp.innerHTML = regInstanceTemp.getErrorMessage();
      validatorTemp.classList.add("invalid");
    } else {
      validatorTemp.classList.remove("invalid");
      errorMessageTemp.innerHTML = "";
    }
  }

  function clear_temp() {

    if ( confirm("Are you sure you want to clear all data?")) {
      localStorage.clear()
      localStorage.setItem("regNumTemp", JSON.stringify([]));
      regInstanceTemp.setSavedArr([]);
      regDisplayTemp.innerHTML = "";
      regInputTemp.value = "";
      townDataElemTemp.value = "Select Town";
     
      updateRegTemplate(regInstanceTemp.getValueInput());
    }
  }

  //  filters towns from the drop box
  function selectTown_temp() {
    regInstanceTemp.setLocationValue(townDataElemTemp.value);
    regInstanceTemp.filterReg();
    const filteredArr = regInstanceTemp.getFilteredArr();

    localStorage.setItem("selectedTown", townDataElemTemp.value);
    

    if (filteredArr.length === 0) {
      updateRegTemplate(regInstanceTemp.getValueInput());
    }
    displayFilteredArray_temp(filteredArr);
    updateTownTemplate(townDataElemTemp.value);
  }

  function displayFilteredArray_temp(filteredArr) {
    renderRegDisplayTempContainer(filteredArr);
    if (filteredArr) {
      filteredArr.forEach((reg) => {
        appendRegToNumberList_temp(reg);
      });
    } else {
      regDisplayTemp.innerHTML = "";
    }
  }
// templates
  function updateTownTemplate(selectedValue) {
    const templateSource = document.querySelector("#regTemplate").innerHTML;
    const townTemplate = Handlebars.compile(templateSource);

    const townData = {
      differentTowns: [
        { name: "Select Town", selected: selectedValue === "Select Town" },
        {
          name: "Cape Town",
          selected: selectedValue === "Cape Town",
        },
        {
          name: "Stellenbosch",
          selected: selectedValue === "Stellenbosch",
        },
        {
          name: "Paarl",
          selected: selectedValue === "Paarl",
        },
      ],
    };
    const userDataHTML = townTemplate(townData);

    townDataElemTemp.innerHTML = userDataHTML;
    townDataElemTemp.value = selectedValue;
  }

  function updateRegTemplate(filteredArr = []) {
    const regDisplayTemplate =
      document.getElementById("regDisplayTemplate").innerHTML;
    const regDisplay = Handlebars.compile(regDisplayTemplate);

    const selectedTown = localStorage.getItem("selectedTown");
    const showFilterMessageAndImage = selectedTown && selectedTown !== "Select Town" && filteredArr.length === 0;

    const registrationData = {
      differentReg: filteredArr,
      filterMessage: showFilterMessageAndImage ? regInstanceTemp.filteredMessage() : "",
      filterImage: showFilterMessageAndImage
          ? '<img src="./images/not_found.svg" width="200"/>'
          : "",
    };

    const userDataHTML = regDisplay(registrationData);
    return userDataHTML;
}


  const savedTownValue = localStorage.getItem("selectedTown") || "Select Town";
  updateRegTemplate(regInstanceTemp.getValueInput());
  updateTownTemplate(savedTownValue);
  displayRegNumbersOnRefresh_temp();
  selectTown_temp();

  function addEventListener() {
    townDataElemTemp.addEventListener("change", selectTown_temp);
    clearBtnTemp.addEventListener("click", clear_temp);
    addRegNumBtnTemp.addEventListener("click", registrationNumAdd_temp);
    regInputTemp.addEventListener("input", inputValid_temp);
  }
});
