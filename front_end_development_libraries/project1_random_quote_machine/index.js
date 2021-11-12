/* AJ
QUOTES API: https://type.fit/api/quotes
	text: ""
	author: ""
*/
function APP() {
	const [ quotes, setQuotes ] = React.useState([]);
	const [ randomQuote, setRandomQuote ] = React.useState([]);
	const [ color, setColor ] = React.useState('#2c3e50');

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
									<i className="fa fa-quote-left mr-10 fs-10"> </i>
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

						<div className="d-flex flex-row red">
							<a
								href={
									'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
									encodeURIComponent('"' + randomQuote.text + '"' + randomQuote.author)
								}
								className="btn btn-warning"
								target="_blank"
								id="tweet-quote"
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
								className="btn btn-danger"
								target="_blank"
							>
								<i className="fa fa-tumblr" />
							</a>
							<button onClick={getNewQuote} className="btn btn-primary ml-3" id="new-quote">
								New quote
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* {quotes.map((quote) => <div>{quote.text}</div>)} */}
		</div>
	);
}

ReactDOM.render(<APP />, document.getElementById('app'));
