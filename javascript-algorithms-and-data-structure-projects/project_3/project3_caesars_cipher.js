/* AJ
Caesars Cipher
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. 
In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
*/
function rot13(str) {
	let decodedAlphabet = {
		A: 'N',
		B: 'O',
		C: 'P',
		D: 'Q',
		E: 'R',
		F: 'S',
		G: 'T',
		H: 'U',
		I: 'V',
		J: 'W',
		K: 'X',
		L: 'Y',
		M: 'Z',
		N: 'A',
		O: 'B',
		P: 'C',
		Q: 'D',
		R: 'E',
		S: 'F',
		T: 'G',
		U: 'H',
		V: 'I',
		W: 'J',
		X: 'K',
		Y: 'L',
		Z: 'M',
		'!': '!',
		'?': '?',
		'.': '.'
	};

	let decipherStr = [];

	for (let i = 0; i < str.length; i++) {
		decipherStr.push(decodedAlphabet[str[i]]);
	}

	let noUndefinedStr = decipherStr.map(function(word) {
		return word === undefined ? ' ' : word;
	});

	return noUndefinedStr.join('');
}

rot13('SERR PBQR PNZC');
console.log(rot13('SERR PBQR PNZC')); //return FREE CODE CAMP
console.log(rot13('SERR CVMMN!')); //return FREE PIZZA!
console.log(rot13('SERR YBIR?')); //return FREE LOVE?
console.log(rot13('GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.')); //return THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
