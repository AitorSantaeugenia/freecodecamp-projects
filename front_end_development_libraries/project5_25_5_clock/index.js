/* AJ
Check it on codepen: https://codepen.io/santaeugeniaJ/full/wvqbbaY
Code in github: https://github.com/AitorSantaeugenia/freecodecamp-projects/tree/main/front_end_development_libraries/project5_25_5_clock
*/

function App() {
	const [ displayTime, setDisplayTime ] = React.useState(25 * 60);
	const [ breakTime, setBreakTime ] = React.useState(5 * 60);
	const [ sessionTime, setSessionTime ] = React.useState(25 * 60);
	const [ timerOn, setTimerOn ] = React.useState(false);
	const [ onBreak, setOnBreak ] = React.useState(false);
	const [ beepAudio, setBeepAudio ] = React.useState(new Audio('./beep.mp3'));

	const formatTime = (time) => {
		let min = Math.floor(time / 60);
		let sec = time % 60;

		return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
	};

	const changeTime = (amount, type) => {
		if (type == 'break') {
			if (breakTime <= 60 && amount < 0) {
				return;
			}
			setBreakTime((prev) => prev + amount);
		} else {
			if (sessionTime <= 60 && amount < 0) {
				return;
			}
			setSessionTime((prev) => prev + amount);
			if (!timerOn) {
				setDisplayTime(sessionTime + amount);
			}
		}
	};

	const controlTime = () => {
		let second = 1000;
		let date = new Date().getTime();
		let nextDate = new Date().getTime() + second;
		let onBreakVariable = onBreak;

		if (!timerOn) {
			let interval = setInterval(() => {
				date = new Date().getTime();
				if (date > nextDate) {
					setDisplayTime((prev) => {
						if (prev <= 0 && !onBreakVariable) {
							playBeepSound();
							onBreakVariable = true;
							setOnBreak(true);
							return breakTime;
						} else if (prev <= 0 && onBreakVariable) {
							playBeepSound();
							onBreakVariable = false;
							setOnBreak(false);
							return sessionTime;
						}
						return prev - 1;
					});
					nextDate += second;
				}
			}, 30);
			localStorage.clear();
			localStorage.setItem('interval-id', interval);
		}

		if (timerOn) {
			clearInterval(localStorage.getItem('interval-id'));
		}

		setTimerOn(!timerOn);
	};

	const resetTime = () => {
		setDisplayTime(25 * 60);
		setBreakTime(5 * 60);
		setSessionTime(25 * 60);
	};

	const playBeepSound = () => {
		beepAudio.currenTime = 0;
		beepAudio.play();
	};

	return (
		<div className="center-align">
			<h1>25 + 5 Clock</h1>
			<div className="dual-container">
				<Lenght
					title={'break length'}
					changeTime={null}
					type={'break'}
					time={breakTime}
					formatTime={formatTime}
					changeTime={changeTime}
					reqname={'break-label'}
				/>

				<Lenght
					title={'session length'}
					changeTime={null}
					type={'session'}
					time={sessionTime}
					formatTime={formatTime}
					changeTime={changeTime}
					reqname={'session-label'}
				/>
			</div>
			<h3>{onBreak ? 'Break' : 'Session'}</h3>
			<h1>{formatTime(displayTime)}</h1>
			<button className="btn-large deep-purple ligthen-2" onClick={controlTime}>
				{timerOn ? (
					<i className="material-icons">pause_circle_filled</i>
				) : (
					<i className="material-icons">play_circle_filled</i>
				)}
			</button>
			<button className="btn-large deep-purple ligthen-2" onClick={resetTime}>
				<i className="material-icons">autorenew</i>
			</button>
		</div>
	);
}

function Lenght({ title, changeTime, type, time, formatTime, reqname }) {
	return (
		<div>
			<h3 id={reqname}>{title}</h3>
			<div className="time-sets">
				<button
					className="btn-small deep-purple lighten-2"
					id="break-decrement"
					id="break-increment"
					onClick={() => changeTime(-60, type)}
				>
					<i className="large material-icons">arrow_downward</i>
				</button>
				<h3>{formatTime(time)}</h3>
				<button
					className="btn-small deep-purple lighten-2"
					id="session-decrement"
					id="session-increment"
					onClick={() => changeTime(60, type)}
				>
					<i className="large material-icons">arrow_upward</i>
				</button>
			</div>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));
