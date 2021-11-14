// AJ
// Check it on codepen: https://codepen.io/santaeugeniaJ/full/dyzqOEJ
// Code in github: https://github.com/AitorSantaeugenia/freecodecamp-projects/tree/main/front_end_development_libraries/project2_markdown_previewer

marked.setOptions({
	breaks: true
});

const renderer = new marked.Renderer();

function App() {
	const [ text, setText ] = React.useState('');

	return (
		<div className="container d-flex flex-column">
			<div className="contactDiv">
				<div className="text-center margin-top10 cWhite">
					<h3 className="underline">Markdown previewer</h3>
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
			<div className="text-center px-3 topDiv">
				<div className="headerDiv1 d-flex">
					<i className="fa fa-free-code-camp" title="no-stack-dub-sack" />
					<p className="text-center tittleText">Editor</p>
				</div>
				<textarea
					name="text"
					id="editor"
					rows="10"
					value={text}
					className="textarea"
					onChange={(e) => setText(e.target.value)}
				/>
			</div>

			<Preview markdown={text} />
		</div>
	);
}

function Preview({ markdown }) {
	return (
		<div className="bottomDiv text-center">
			<div className="headerDiv2 d-flex">
				<i className="fa fa-free-code-camp" title="no-stack-dub-sack" />
				<p className="text-center tittleText">Previewer</p>
			</div>
			<div
				dangerouslySetInnerHTML={{ __html: marked(markdown, { renderer: renderer }) }}
				id="preview"
				className="text-center"
			/>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));
