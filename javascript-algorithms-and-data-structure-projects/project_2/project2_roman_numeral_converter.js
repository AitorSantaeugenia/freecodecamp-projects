/*
Roman Numeral Converter
Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.
*/
function convertToRoman(num) {
	let romanNumbers = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1
	};

	let roman = '';

	for (const i in romanNumbers) {
		while (num >= romanNumbers[i]) {
			roman += i;
			num -= romanNumbers[i];
		}
	}
	return roman;
}

convertToRoman(36);
console.log(convertToRoman(0));
console.log(convertToRoman(2));
console.log(convertToRoman(12));
console.log(convertToRoman(99));
console.log(convertToRoman(400));
console.log(convertToRoman(501));
console.log(convertToRoman(649));
console.log(convertToRoman(798));
console.log(convertToRoman(891));
console.log(convertToRoman(1004));
console.log(convertToRoman(1023));
console.log(convertToRoman(2014));
console.log(convertToRoman(3999));
