// AJ
// Check it on codepen: https://codepen.io/santaeugeniaJ/full/dyzqOEJ
// Code in github: https://github.com/AitorSantaeugenia/freecodecamp-projects/tree/main/front_end_development_libraries/project2_markdown_previewer

marked.setOptions({
	breaks: true
});

const renderer = new marked.Renderer();
const defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`;
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
	if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
		return multiLineCode;
	}
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

function App() {
	const [ text, setText ] = React.useState(defaultText);

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
					<br />
					<br />
					<div className="toGithub">
						<a
							href="https://github.com/AitorSantaeugenia/freecodecamp-projects/tree/main/front_end_development_libraries/project2_markdown_previewer"
							className="btn wBorder marginRight10"
							target="_blank"
							id="tumblr-quote"
						>
							{' '}
							Check the code on &nbsp;
							<i className="fa fa-github" />
						</a>
					</div>
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
