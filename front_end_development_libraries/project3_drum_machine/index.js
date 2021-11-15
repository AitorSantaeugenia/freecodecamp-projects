// AJ
// Check it on codepen: https://codepen.io/santaeugeniaJ/full/MWvzKYJ
// Code in github: https://github.com/AitorSantaeugenia/freecodecamp-projects/tree/main/front_end_development_libraries/project3_drum_machine
const audioClips = [
	{
		keyCode: 81,
		keyTrigger: 'Q',
		id: 'Heater-1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
	},
	{
		keyCode: 87,
		keyTrigger: 'W',
		id: 'Heater-2',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
	},
	{
		keyCode: 69,
		keyTrigger: 'E',
		id: 'Heater-3',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
	},
	{
		keyCode: 65,
		keyTrigger: 'A',
		id: 'Heater-4',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
	},
	{
		keyCode: 83,
		keyTrigger: 'S',
		id: 'Clap',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
	},
	{
		keyCode: 68,
		keyTrigger: 'D',
		id: 'Open-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
	},
	{
		keyCode: 90,
		keyTrigger: 'Z',
		id: "Kick-n'-Hat",
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
	},
	{
		keyCode: 88,
		keyTrigger: 'X',
		id: 'Kick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
	},
	{
		keyCode: 67,
		keyTrigger: 'C',
		id: 'Closed-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
	}
];

function App() {
	const [ volume, setVolume ] = React.useState(1);
	const [ recording, setRecording ] = React.useState('');
	const [ speed, setSpeed ] = React.useState(0.5);

	const playRecording = () => {
		let index = 0;
		let recordArray = recording.split(' ');
		const interval = setInterval(() => {
			const audioTag = document.getElementById(recordArray[index]);
			audioTag.volume = volume;
			audioTag.currentTime = 0;
			audioTag.play();
			index++;
		}, speed * 600);

		setTimeout(() => clearInterval(interval), 600 * speed * recordArray.length - 1);
	};

	return (
		<div className="bg-dark min-vh-100 text-white" id="drum-machine">
			<div className="text-center p-5">
				<h2>Drum Machine</h2>
				<p>Press those keys or click using the mouse.</p>
				<div className="drumMachine" id="display">
					<h4 className="marginTop1">Volume</h4>
					<input
						type="range"
						step="0.01"
						value={volume}
						max="1"
						min="0"
						className="w-50"
						onChange={(e) => setVolume(e.target.value)}
					/>
					<br />
					{audioClips.map((clip) => (
						<Pad clip={clip} key={clip.id} volume={volume} setRecording={setRecording} />
					))}

					<br />
					{recording && (
						<div>
							<p> Your sequence: </p>
							<h3 className="bg-success marginTop1">{recording}</h3>

							<button onClick={playRecording} className="btn btn-success marginRight1">
								Play
							</button>
							<button onClick={() => setRecording('')} className="btn btn-danger">
								Clear
							</button>
							<br />
							<h4 className="marginTop1">Speed</h4>
							<input
								type="range"
								step="0.01"
								value={speed}
								max="1.2"
								min="0.1"
								className="w-50"
								onChange={(e) => setSpeed(e.target.value)}
							/>
						</div>
					)}
				</div>
				<div className="text-center marginTop1">
					<a href="https://github.com/AitorSantaeugenia" target="_blank" className="noFormat">
						<h3 className="noFormat">Aitor J. Santaeugenia</h3>
					</a>
				</div>
				<div className="text-center marginTop1">
					<a
						href="https://github.com/AitorSantaeugenia"
						className="btn wBorder marginRight1"
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

function Pad({ clip, volume, setRecording }) {
	const [ active, setActive ] = React.useState(false);

	React.useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	const handleKeyPress = (e) => {
		if (e.keyCode === clip.keyCode) {
			playSound();
		}
	};

	const playSound = () => {
		const audioTag = document.getElementById(clip.keyTrigger);
		setActive(true);
		setTimeout(() => {
			setActive(false);
		}, 200);
		audioTag.volume = volume;
		audioTag.currentTime = 0;
		audioTag.play();
		setRecording((prev) => prev + clip.keyTrigger + ' ');
	};

	return (
		<div
			className={`btn btn-secondary drum-pad p-4 m-3 ${active && 'btn-warning'}`}
			onClick={playSound}
			id={clip.id}
		>
			<audio id={clip.keyTrigger} className="clip" src={clip.url} />
			{clip.keyTrigger}
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));
