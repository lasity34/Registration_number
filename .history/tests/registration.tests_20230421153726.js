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

    assert.equal(undefined, regInstance.getValueInput());
  });

  it("this will return error if length of string is below 4", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("CJ1");
    regInstance.getValueInput()
    regInstance.testValueInput()

    assert.equal(undefined, regInstance.getValueInput());
  });

  it("this will return error if length of string is above 7", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("CJ1gdasd");

    assert.equal(undefined, regInstance.getValueInput());
  });

  it("this will return false if first 2 or last 2 numbers are not letters", function () {
    const regInstance = registrationNumber();

    regInstance.setValueInput("C11gdasd");

    assert.equal(undefined, regInstance.getValueInput());
  });
});
