/* AJ
Cash Register
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), 
payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, 
as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/
function checkCashRegister(price, cash, cid) {
	//total cid param
	let total = 0;
	//change to return
	let changeCurrency = cash - price;
	//currencies
	const currencies = {
		PENNY: 0.01,
		NICKEL: 0.05,
		DIME: 0.1,
		QUARTER: 0.25,
		ONE: 1.0,
		FIVE: 5.0,
		TEN: 10.0,
		TWENTY: 20.0,
		'ONE HUNDRED': 100.0
	};

	//total cid SUM
	for (let element of cid) {
		total += element[1];
	}
	//toFixed for two decimals, Number() || parseFloat() to transform to num
	total = total.toFixed(2);

	const change = [];
	//return insufficient funds if change is greater than total
	if (changeCurrency > total) {
		return { status: 'INSUFFICIENT_FUNDS', change: change };
		//return closed if change is equal than total
	} else if (changeCurrency.toFixed(2) === total) {
		return { status: 'CLOSED', change: cid };
		//return OPEN if change lower than total
	} else {
		cid = cid.reverse();
		for (let currency of cid) {
			let temp = [ currency[0], 0 ];
			while (changeCurrency >= currencies[currency[0]] && currency[1] > 0) {
				temp[1] += currencies[currency[0]];
				currency[1] -= currencies[currency[0]];
				changeCurrency -= currencies[currency[0]];
				changeCurrency = changeCurrency.toFixed(2);
			}
			if (temp[1] > 0) {
				change.push(temp);
			}
		}
	}

	if (changeCurrency > 0) {
		return { status: 'INSUFFICIENT_FUNDS', change: [] };
	}

	return { status: 'OPEN', change: change };
}

checkCashRegister(19.5, 20, [
	[ 'PENNY', 1.01 ],
	[ 'NICKEL', 2.05 ],
	[ 'DIME', 3.1 ],
	[ 'QUARTER', 4.25 ],
	[ 'ONE', 90 ],
	[ 'FIVE', 55 ],
	[ 'TEN', 20 ],
	[ 'TWENTY', 60 ],
	[ 'ONE HUNDRED', 100 ]
]);

console.log(
	checkCashRegister(19.5, 20, [
		[ 'PENNY', 1.01 ],
		[ 'NICKEL', 2.05 ],
		[ 'DIME', 3.1 ],
		[ 'QUARTER', 4.25 ],
		[ 'ONE', 90 ],
		[ 'FIVE', 55 ],
		[ 'TEN', 20 ],
		[ 'TWENTY', 60 ],
		[ 'ONE HUNDRED', 100 ]
	])
); // return {status: "OPEN", change: [["QUARTER", 0.5]]}

console.log(
	checkCashRegister(3.26, 100, [
		[ 'PENNY', 1.01 ],
		[ 'NICKEL', 2.05 ],
		[ 'DIME', 3.1 ],
		[ 'QUARTER', 4.25 ],
		[ 'ONE', 90 ],
		[ 'FIVE', 55 ],
		[ 'TEN', 20 ],
		[ 'TWENTY', 60 ],
		[ 'ONE HUNDRED', 100 ]
	])
); //return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}

console.log(
	checkCashRegister(19.5, 20, [
		[ 'PENNY', 0.01 ],
		[ 'NICKEL', 0 ],
		[ 'DIME', 0 ],
		[ 'QUARTER', 0 ],
		[ 'ONE', 1 ],
		[ 'FIVE', 0 ],
		[ 'TEN', 0 ],
		[ 'TWENTY', 0 ],
		[ 'ONE HUNDRED', 0 ]
	])
);
