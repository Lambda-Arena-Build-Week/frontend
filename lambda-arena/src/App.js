import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Game from './components/game';

import Login from './components/login'

import { validateAuthentication } from './utils/validateAuthentication';

class App extends Component {

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
									<Login />


							}
							/>
					</Router>
				</header>
			</div>
		);
	}

 
}

export default App;
