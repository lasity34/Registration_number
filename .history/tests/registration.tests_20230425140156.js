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

    assert.equal("numbers and letters only", regInstance.getErrorMessage());
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

    regInstance.setValueInput("CJ11233434");
    regInstance.getValueInput();
    regInstance.testValueInput();

    assert.equal("Too long", regInstance.getErrorMessage());
  });

  it("this will return error if string first 2 is not the right location", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("Cs11233434");
    regInstance.getValueInput();
    regInstance.testValueInput();

    assert.equal("This is not a valid reg number", regInstance.getErrorMessage());
  });

  it("this return error if name is repeated", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("CJ12334");
    regInstance.getValueInput();
    regInstance.callRegNum()
    regInstance.setValueInput("CJ12334");
    regInstance.getValueInput()
    regInstance.testValueInput();

    assert.equal("Already used", regInstance.getErrorMessage());
  });
});

