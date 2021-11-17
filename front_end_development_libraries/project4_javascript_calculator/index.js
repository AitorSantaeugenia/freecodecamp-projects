/* AJ
Check it on codepen: https://codepen.io/santaeugeniaJ/full/mdMaKme
Code in github: https://github.com/AitorSantaeugenia/freecodecamp-projects/tree/main/front_end_development_libraries/project4_javascript_calculator
*/

function App() {
	//useState
	const [ expression, setExpression ] = React.useState('');
	const [ answer, setAnswer ] = React.useState('');

	const calculate = () => {
		setAnswer(eval(expression));
		setExpression((prev) => prev + '=');
	};
	const allClear = () => {
		setExpression('');
		setAnswer('');
	};
	const clear = () => {
		setExpression((prev) => prev.split('').slice(0, prev.length - 1).join(''));
		setAnswer('');
	};

	const display = (symbol) => {
		setExpression((prev) => prev + symbol);
		setAnswer((prev) => prev + symbol);
		if (expression[expression.length - 1] == '=') {
			if (/[0-9]/.test(symbol)) {
				setExpression(symbol);
				setAnswer(symbol);
			} else {
				setExpression(answer + symbol);
				setAnswer(answer + symbol);
			}
		}
	};
	return (
		<div className="container d-flex flex-column">
			<div className="title ">
				<h2 className="colorWhite pad-30">JavaScript Calculator</h2>
			</div>
			<div className="grid">
				<div className="dis">
					<input type="text" value={expression} placeholder="0" disabled />
					<input type="text" className="total" value={answer} id="display" placeholder="0" disabled />
				</div>
				<div onClick={allClear} className="padButton AC redButton" id="clear">
					AC
				</div>
				<div onClick={clear} className="padButton C redButton">
					C
				</div>
				<div onClick={() => display('/')} className="padButton div" id="divide">
					/
				</div>
				<div onClick={() => display('*')} className="padButton times" id="multiply">
					*
				</div>
				<div onClick={() => display('7')} className="padButton seven dark-gray" id="seven">
					7
				</div>
				<div onClick={() => display('8')} className="padButton eight dark-gray" id="eight">
					8
				</div>
				<div onClick={() => display('9')} className="padButton nine dark-gray" id="nine">
					9
				</div>
				<div onClick={() => display('-')} className="padButton minus" id="subtract">
					-
				</div>
				<div onClick={() => display('4')} className="padButton four dark-gray" id="four">
					4
				</div>
				<div onClick={() => display('5')} className="padButton five dark-gray" id="five">
					5
				</div>
				<div onClick={() => display('6')} className="padButton six dark-gray" id="six">
					6
				</div>
				<div onClick={() => display('+')} className="padButton plus" id="add">
					+
				</div>
				<div onClick={() => display('1')} className="padButton one dark-gray" id="one">
					1
				</div>
				<div onClick={() => display('2')} className="padButton two dark-gray" id="two">
					2
				</div>
				<div onClick={() => display('3')} className="padButton three dark-gray" id="three">
					3
				</div>
				<div onClick={calculate} className="padButton equal blueButton" id="equals">
					=
				</div>
				<div onClick={() => display('0')} className="padButton zero dark-gray" id="zero">
					0
				</div>
				<div onClick={() => display('.')} className="padButton dot dark-gray" id="decimal">
					.
				</div>
			</div>
			<div className="footer">
				<div className="text-center ">
					<a href="https://github.com/AitorSantaeugenia" target="_blank" className="noFormat">
						<h3 className="noFormat">Aitor J. Santaeugenia</h3>
					</a>
				</div>
				<div className="text-center marginTop20">
					<a
						href="https://github.com/AitorSantaeugenia"
						className="btn wBorder marginRight10"
						target="_blank"
						id="tumblr-quote"
					>
						<i className="fa fa-github" />
					</a>
					<a
						href="https://www.linkedin.com/in/aitorjsantaeugenia/"
						className="btn wBorder"
						target="_blank"
						id="tumblr-quote"
					>
						<i className="fa fa-linkedin" />
					</a>
				</div>
			</div>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));
