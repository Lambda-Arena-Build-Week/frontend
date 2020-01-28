import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Game from './components/game';
import Login from './components/login';
import About from './components/About';

import { validateAuthentication } from './utils/validateAuthentication';

class App extends Component {
	state = {
		modalIsOpen: false
	}

	render() {
		return (
			<div className="App" style={{width:'100%'}}>
				<About modalIsOpen={this.state.modalIsOpen}/>
				<a href="#" onClick={() => this.setState({ modalIsOpen: true})}>About</a>
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
