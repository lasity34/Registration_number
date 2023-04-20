


describe("this is a input values", function() {
    it("this will test that a value string can be passed", function() {
        const regInstance = registrationNumber()

        regInstance.setValueInput("CJ10234")
        
        assert.equal("CJ10234", regInstance.getValueInput())
    })
})