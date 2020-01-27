import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Game from './components/game';
 
import AuthModal from './components/AuthModal';

import { validateAuthentication } from './utils/validateAuthentication';

class App extends Component {
	state = {
		modalIsOpen: true
	}

	render() {
		console.log("token", validateAuthentication());
		return (
			<div className="App" style={{width:'100%'}}>
				<header className="App-header">
					<Router>
						<Route
							exact
							path="/"
							render={
								() =>
									validateAuthentication() ?
									<Game style={{width: '100%'}}/> :
									<AuthModal modalIsOpen={true} />


							}
							/>
					</Router>
				</header>
			</div>
		);
	}

 
}

export default App;
