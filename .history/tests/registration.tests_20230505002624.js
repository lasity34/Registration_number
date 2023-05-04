describe("this is a input values", function () {
  it("this will test that a value string can be passed", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("CJ10234");
   
   


    assert.equal("CJ10234", regInstance.getValueInput());
  });

  it("All strings returned will have the letters capitalized", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("cj32132");

    assert.equal("CJ32132", regInstance.getValueInput());
  });

  it("This will return false if any anything other than a string or number is passed", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("CJ31204#");
    regInstance.getValueInput();
    regInstance.testValueInput();

    assert.equal('only First 2 must be letters', regInstance.getErrorMessage());
  });

  it("this will return error if length of string is below 7", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("CJ1");
    regInstance.getValueInput();
    regInstance.testValueInput();

    assert.equal("Too short", regInstance.getErrorMessage());
  });

  it("this will return error if any other characters besides first 2 are letters", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("CJ11234f");
    regInstance.getValueInput();
    regInstance.testValueInput();

    assert.equal("only First 2 must be letters", regInstance.getErrorMessage());
  });

  it("this will return error if length of string is above 9", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("CA112334312");
    regInstance.getValueInput();
    regInstance.testValueInput();

    assert.equal("Too long", regInstance.getErrorMessage());
  });

  it("this will return error if string first 2 is not the right location", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("Cx11233");
    regInstance.getValueInput();
    regInstance.testValueInput();

    assert.equal("Has to start with CA, CJ or CL", regInstance.getErrorMessage());
  });

  it("this return error if name is repeated", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("CJ12334");
    regInstance.getValueInput();
    regInstance.addRegistrationNumber()
    regInstance.setValueInput("CJ12334");
    regInstance.getValueInput()
    regInstance.testValueInput();

    assert.equal("Already used", regInstance.getErrorMessage());
  });
});


describe("This checks filters", function() {

  it("This will check if Stellenbosch reg is filtered", function() {
    const regInstance = registrationNumber();

    regInstance.setLocationValue("Stellenbosch")
    regInstance.setValueInput("CJ22334");
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()
    regInstance.setValueInput("CL12334")
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()
    regInstance.setValueInput("CA12334");
    regInstance.addRegistrationNumber()
    regInstance.filterReg()


    assert.equal("CL12334", regInstance.getFilteredArr())
  })

  it("This will check if Paarl reg is filtered", function() {
    const regInstance = registrationNumber();

    regInstance.setLocationValue("Paarl")
    regInstance.setValueInput("CJ22334");
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()
    regInstance.setValueInput("CL12334")
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()
    regInstance.setValueInput("CA12334");
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()

    assert.equal("CJ22334", regInstance.getFilteredArr())
  })

  it("This will check if Cape Town reg is filtered", function() {
    const regInstance = registrationNumber();

    regInstance.setLocationValue("Cape Town")
    regInstance.setValueInput("CJ22334");
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()
    regInstance.setValueInput("CL12334")
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()
    regInstance.setValueInput("CA12334");
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()

    assert.equal("CA12334", regInstance.getFilteredArr())
  })

  it("This will check if a message is displayed when there is no reg num in cape town filter", function() {
    const regInstance = registrationNumber();

    regInstance.setLocationValue("Cape Town")
    regInstance.setValueInput("CJ22334");
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()
    regInstance.setValueInput("CL12334")
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()
    regInstance.setValueInput("CJ12334");
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()

    assert.equal("The are no reg numbers for Cape Town", regInstance.filteredMessage())
  })

  it("This will check if a message is displayed when there is no reg num in Paarl filter", function() {
    const regInstance = registrationNumber();

    regInstance.setLocationValue("Paarl")
    regInstance.setValueInput("CA22334");
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()
    regInstance.setValueInput("CL12334")
    regInstance.addRegistrationNumber()
    regInstance.filterReg()
    regInstance.getFilteredArr()
   

    assert.equal("The are no reg numbers for Paarl", regInstance.filteredMessage())
  })

  it("This will check if a message is displayed when there is no reg num in stellenbosch filter", function() {
    const regInstance = registrationNumber();

    regInstance.setLocationValue("stellenbosch")
    regInstance.setValueInput("CJ22334");
    regInstance.callRegNum()
    regInstance.filterReg()
    regInstance.getFilteredArr()
    regInstance.setValueInput("CA12334")
    regInstance.callRegNum()
    regInstance.filterReg()
    regInstance.getFilteredArr()
   

    assert.equal("The are no reg numbers for Stellenbosch", regInstance.filteredMessage())
  })

  it("This will check if a message is displayed when there is no reg num in Paarl filter", function() {
    const regInstance = registrationNumber();

    regInstance.setLocationValue("paarl")
    regInstance.setValueInput("CL22334");
    regInstance.callRegNum()
    regInstance.filterReg()
    regInstance.getFilteredArr()
    regInstance.setValueInput("CA12334")
    regInstance.callRegNum()
    regInstance.filterReg()
    regInstance.getFilteredArr()
   

    assert.equal("The are no reg numbers for Paarl", regInstance.filteredMessage())
  })
})
