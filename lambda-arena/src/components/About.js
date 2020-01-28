import React, {Component} from 'react';
import Login from './login';
import Modal from 'react-modal';
import styled from 'styled-components';
import { GoMarkGithub } from "react-icons/go";


const modalStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(111, 19, 19, 0.75)'
	},
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)',
		backgroundColor       : 'dimgrey',
		border                : '1px solid black'
	}
}

Modal.setAppElement('#root');

class About extends Component {
	state = {
		modalIsOpen: this.props.modalIsOpen
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.modalIsOpen !== this.state.modalIsOpen) {
			this.setState({ modalIsOpen: nextProps.modalIsOpen });
		}
	}

	render() {
		return (
			<Modal
				isOpen={this.state.modalIsOpen}
				onRequestClose={() => this.setState({ modalIsOpen: false})}
				style={modalStyles}
			>
				<AboutWrapper>
					<h1>About</h1>
					<p>Deadly Arena is a multiplayer third person shooter developed using Unity, React, Node, and Django.</p>
					<IconWrapper><GoMarkGithub/></IconWrapper><a href="https://github.com/Lambda-Arena-Build-Week">GitHub Repo</a>
					<h3>Engineers</h3>
					<EngineerWrapper>
						Hello
					</EngineerWrapper>
				</AboutWrapper>
			</Modal>
		)
	}
}

export default About;

const AboutWrapper = styled.div`
	@import url('https://fonts.googleapis.com/css?family=Share&display=swap');
	width: 100%;
	width: 600px;
	background-color: #944340;
	border: 2px solid black;
	padding: 20px;
	font-family: 'Share', cursive;
	p {
		font-size: 1.5rem;
	}
	a {
		color: black;
		font-size: 1.5rem;
	}
`;

const IconWrapper = styled.div`
	margin-right: 10px;
	display: inline-block;
`;
const EngineerWrapper = styled.div`

`;
