import React, {Component} from 'react';
import About from "./About";
import styled from 'styled-components';

class Navigation extends Component {
	state = {
		modalIsOpen: false
	}

	render() {
		return (
			<NavWrapper>
				<Nav>
					<About modalIsOpen={this.state.modalIsOpen}/>
					<a href="#" onClick={() => this.setState({modalIsOpen: true})}>About</a>
				</Nav>
			</NavWrapper>
		)
	}
}

export default Navigation

const NavWrapper = styled.div`
	width: 100%;
`;

const Nav = styled.nav`
	display: flex;
	flex-direction: row;
	width: 100%;
	max-width: 800px;
	margin: 10px auto;
	a {
		font-size: 1.5rem;
		font-weight: bold;
		color: black;
		text-decoration: none;
	}
`;
