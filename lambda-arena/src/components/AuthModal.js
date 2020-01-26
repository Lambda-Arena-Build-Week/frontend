import React, {Component} from 'react';
import Login from './login';
import Modal from 'react-modal';


const modalStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)'
	}
}

class AuthModal extends Component {
	state = {
		modalIsOpen: this.props.modalIsOpen
	}

	validateAuth = () => {
		this.setState({
			modalIsOpen: true
		})
	}

	render() {
		return (
			<Modal
				isOpen={this.state.modalIsOpen}
				onRequestClose={this.validateAuth}
				style={modalStyles}
			>
				<Login/>
			</Modal>
		)
	}
}

export default AuthModal;