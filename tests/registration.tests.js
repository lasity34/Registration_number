


describe("this is a test", function() {
    it("this should test the value", function() {
        const regInstance = registrationNumber()

        regInstance.setNumber(2)

        assert.equal(2, regInstance.getNumber())
    })
})