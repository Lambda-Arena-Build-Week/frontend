import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/game';
import AuthModal from './components/AuthModal';

class App extends Component {
	state = {
		modalIsOpen: true
	}

	render() {
		return (
			<div className="App" style={{width:'100%'}}>
				<header className="App-header">
					<AuthModal modalIsOpen={true} />
					<Game style={{width:'100%'}}/>
				</header>
			</div>
		);
	}

}

export default App;
