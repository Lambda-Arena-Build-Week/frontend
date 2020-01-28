import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Game from './components/game';
import Login from './components/login';
import Navigation from './components/Navigation';

import { validateAuthentication } from './utils/validateAuthentication';

class App extends Component {

	render() {
		return (
			<div className="App" style={{width:'100%'}}>
			 <Navigation />
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
