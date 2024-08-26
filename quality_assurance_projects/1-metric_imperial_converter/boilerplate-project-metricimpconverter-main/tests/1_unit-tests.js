const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    suite("convertHandler.getNumber(input)", function(){

        test("should correctly read a whole number input", function(done){
            let input = "1L";
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });

        test("should correctly read a decimal number input", function(done){
            let input = "1.1L";
            assert.equal(convertHandler.getNum(input), 1.1);
            done();
        });

        test("should correctly read a fractional input", function(done){
            let input = "1/1L";
            assert.equal(convertHandler.getNum(input), 1/1);
            done();
        });

        test("should correctly read a fractional input with a decimal", function(done){
            let input = "1.1/1L";
            assert.equal(convertHandler.getNum(input), 1.1/1);
            done();
        });

        test("should correctly return an error on a double-fraction (i.e. 3/2/3)", function(done){
            let input = "3/2/3L";
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });

        test("should correctly default to a numerical input of 1 when no numerical input is provided", function(done){
            let input = "L";
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });

    suite("convertHandler.getUnit(input)", function(){
        test("should correctly read each valid input unit", function(done){
            let input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG"];
            let output = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg"];
            input.forEach(function (e, index) {
                assert.equal(convertHandler.getUnit(e), output[index]);
            })
            done();
        });

        test("should correctly return an error for an invalid input unit", function(done){
            assert.equal(convertHandler.getUnit("1kilograms"), undefined);
            done();
        });
    });

    suite("convertHandler.getReturnUnit(initUnit)", function(){
        test("should return the correct return unit for each valid input unit", function(done){
            let input = ["gal", "l", "mi", "km", "lbs", "kg"];
            let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
            input.forEach(function (e, i) {
                assert.equal(convertHandler.getReturnUnit(e), expect[i]);
            })
            done();
        });

    });


    suite("convertHandler.spellOutUnit(unit)", function(){
        test("should correctly return the spelled-out string unit for each valid input unit", function(done){
            let input = ["gal", "l", "mi", "km", "lbs", "kg"];
            let expect = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
            input.forEach(function (e, i) {
                assert.equal(convertHandler.spellOutUnit(e), expect[i]);
            })
            done();
        });
    });

    suite("convertHandler.spellOutUnit(unit)", function(){
        test("should correctly convert gal to L", function(done){
            let input = [1, "gal"];
            let expected = 3.78541;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test("should correctly convert L to gal", function(done){
            let input = [1, "L"];
            let expected = 0.26417;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test("should correctly convert mi to km", function(done){
            let input = [1, "Mi"];
            let expected = 1.60934;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test("should correctly convert km to mi", function(done){
            let input = [1, "km"];
            let expected = 0.62137;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test("should correctly convert lbs to kg", function(done){
            let input = [1, "lbs"];
            let expected = 0.45359;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test("should correctly convert kg to lbs", function(done){
            let input = [1, "kg"];
            let expected = 2.20462;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });
    })

});