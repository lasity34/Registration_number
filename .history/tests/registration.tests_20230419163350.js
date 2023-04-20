


describe("this is a input values", function() {
    it("this will test a reg value that is a string", function() {
        const regInstance = registrationNumber()

        regInstance.setValueInput()
        
        assert.equal("CJ10234", regInstance.getValueInput())
    })
})