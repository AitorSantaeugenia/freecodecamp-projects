/* AJ
QUOTES API: https://type.fit/api/quotes
	text: ""
	author: ""

Check it on codepen: https://codepen.io/santaeugeniaJ/pen/yLojZQg
Code in github: https://github.com/AitorSantaeugenia/freecodecamp-projects/tree/main/front_end_development_libraries/project1_random_quote_machine
*/
function APP() {
	const [ quotes, setQuotes ] = React.useState([]);
	const [ randomQuote, setRandomQuote ] = React.useState([]);
	const [ color, setColor ] = React.useState('#9b59b6');

	React.useEffect(() => {
		async function fetchData() {
			const response = await fetch('https://type.fit/api/quotes');
			const data = await response.json();

			setQuotes(data);
			let random = Math.floor(Math.random() * data.length);
			setRandomQuote(data[random]);
		}
		fetchData();
	}, []);

	const getNewQuote = () => {
		const colors = [
			'#16a085',
			'#27ae60',
			'#2c3e50',
			'#f39c12',
			'#e74c3c',
			'#9b59b6',
			'#FB6964',
			'#342224',
			'#472E32',
			'#BDBB99',
			'#77B1A9',
			'#73A857'
		];

		let random = Math.floor(Math.random() * quotes.length);
		let randomColor = Math.floor(Math.random() * colors.length);
		setRandomQuote(quotes[random]);
		setColor(colors[randomColor]);
	};

	return (
		<div style={{ backgroundColor: color, minHeight: '100vh' }}>
			<div className="container align-center">
				<div className="card" id="quote-box">
					<div className="card-body">
						{randomQuote ? (
							<div>
								<p className="card-text" id="text">
									<i className="fa fa-quote-left mr-10 fs-10" style={{ color: color }}>
										{' '}
									</i>
									{randomQuote.text}
								</p>
								<h5 className="card-title" id="author">
									{' '}
									- {randomQuote.author || 'No author'}
								</h5>
							</div>
						) : (
							<h2>Loading</h2>
						)}

						<div className="d-flex flex-row containerButtons container">
							<div className="leftDiv">
								<a
									href={
										'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
										encodeURIComponent('"' + randomQuote.text + '"' + randomQuote.author)
									}
									className="btn"
									target="_blank"
									id="tweet-quote"
									style={{ backgroundColor: color }}
								>
									{' '}
									<i className="fa fa-twitter" />
								</a>
								<a
									href={
										'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
										encodeURIComponent(randomQuote.author) +
										'&content=' +
										encodeURIComponent(randomQuote.text) +
										'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbutton&shareSource=tumblr_share_button'
									}
									className="btn"
									target="_blank"
									id="tumblr-quote"
									style={{ backgroundColor: color }}
								>
									<i className="fa fa-tumblr" />
								</a>
							</div>
							<div className="rigthDiv">
								<button
									onClick={getNewQuote}
									className="btn ml-3"
									id="new-quote"
									style={{ backgroundColor: color }}
								>
									New quote
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="text-center margin-top10 cWhite">
					<div className="toGithub">
						<a
							href="https://github.com/AitorSantaeugenia/freecodecamp-projects/tree/main/front_end_development_libraries/project1_random_quote_machine"
							className="btn wBorder marginRight10"
							target="_blank"
							id="tumblr-quote"
						>
							{' '}
							Check the code on &nbsp;
							<i className="fa fa-github" />
						</a>
					</div>
					<br />
					<a href="https://github.com/AitorSantaeugenia" target="_blank" className="noFormat">
						<h3 className="noFormat">Aitor J. Santaeugenia</h3>
					</a>
				</div>
				<div className="text-center cWhite">
					<a
						href="https://github.com/AitorSantaeugenia"
						className="btn wBorder"
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

ReactDOM.render(<APP />, document.getElementById('app'));
