


function registrationNumber() {

    let newNum = 0

    function setNumber(num) {
        newNum = num
    }

    function getNumber()  {
        return newNum
    }


    return {
        setNumber,
        getNumber
    }
}