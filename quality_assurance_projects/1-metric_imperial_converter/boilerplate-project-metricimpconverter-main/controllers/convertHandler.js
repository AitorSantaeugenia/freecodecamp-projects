const { parse } = require("dotenv");

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = stringSplitter(input)[0];
    let nums = checkDivision(result);

    if(!nums){
      return undefined;
    }

    let num1 = nums[0];
    let num2 = nums[1] || "1";

    result = parseFloat(num1) / parseFloat(num2);

    //1.1.1 ex
    if(isNaN(num1) || isNaN(num2)){
      return undefined;
    }
  
    // console.log("getNum(result) -> "+result);

    return result;
  };
  
  this.getUnit = function(input) {
    let result = stringSplitter(input)[1].toLowerCase();

    // console.log("getNum(result) -> "+result);
    
    switch(result){
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }  
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = initUnit.toLowerCase();
    
    switch(result){
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(initUnit) {
    let result = initUnit.toLowerCase();
    
    switch(result){
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      default:
        return "Incorrect Unit";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let unit = initUnit.toLowerCase();

    switch(unit){
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        return undefined;
    }

    // console.log("convert -> "+result.toFixed((5)));

    return parseFloat(result.toFixed((5)));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

function stringSplitter(input){
  let num = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];

  //console.log(num, string) <- Working

  return [num[0], string];
}

//convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
function checkDivision(input){
  let nums = input.split("/");

  if(nums.length > 2){
    return false;
  }
  return nums;
}

module.exports = ConvertHandler;
