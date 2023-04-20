


describe("this is a input values", function() {
    it("this will test that a value string can be passed", function() {
        const regInstance = registrationNumber()

        regInstance.setValueInput("CJ10234")
        
        assert.equal("CJ10234", regInstance.getValueInput())
    })

    it("This will return false if any anyhting other than a string or number is passed", function() {
        const regInstance = registrationNumber()

        regInstance.setValueInput("CJ31204#")


        assert.equal(false, regInstance.getValueInput())
    })
    
})