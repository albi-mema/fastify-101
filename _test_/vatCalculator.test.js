const vatCalculator = require('../src/utlis/vatCalculator')

describe("VAT calculator",() => {
    test("should return the correct VAT exluded ammount for 20% VAT",() =>{
        const result = vatCalculator.calculateVAT(16.67)
        expect(result).toBe(3.33)
    })

    test("should return correct gross amount for 20% VAT",() => {
        const result = vatCalculator.calculateGrossAmount(16.67)
        expect(result).toBe(20) 
    })

    test("should return the correct net amount for 20% VAT",() => {
        const result = vatCalculator.calculateNetAmount(20)
        expect(result).toBe(16.67)
    })
})