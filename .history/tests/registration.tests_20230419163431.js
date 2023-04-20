


describe("this is a input values", function() {
    it("this will test a reg value that is a string", function() {
        const regInstance = registrationNumber()

        regInstance.setValueInput("CJ10234")
        
        assert.equal("CJ10234", regInstance.getValueInput())
    })
})