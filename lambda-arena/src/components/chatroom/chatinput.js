import React from "react";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import TextField from '@material-ui/core/TextField';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        input: "",
        emojiOpen: false
    }

    this.inputRef = React.createRef();
  }

  inputChange = (e) =>{
      
      this.setState({input: e.target.value});
  }

  submitChat = (e) => {

    e.preventDefault();

    if (this.state.input.length > 0)
    {
        this.props.sendChatMessage({user: localStorage.getItem('gametag'), message: this.state.input});
        this.setState({input: ''});
    }
  }

  onEmojiClick = (emojiObject) => {
    this.setState({input: this.state.input + emojiObject.native, emojiOpen: false});
    this.inputRef.current.focus();
  }

  openEmoji = () => {
    this.setState({emojiOpen: !this.state.emojiOpen});
  }

  handleClose = () => {
    this.setState({emojiOpen: false});
  };

  render() {

    const style = {
      emojiPopup:{
       
        visibility: !this.state.emojiOpen ? 'hidden' : '',
     
      },
      emojiButton:{
     
          width: '5%',
        
          padding: '5px',
          marginRight:'5px',
          color: 'white',
          font: '3.5rm',
          alignContent:'center',
           
 
      },
      chatInputBar:{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
        
          position: "relative",

      },
      inputBar:{
          width: '90%',
      }

    }

    const enterPressed=(e)=> {
        if (e.keyCode === 13) {
            this.submitChat(e);
        }
    }

 
    const id = this.state.emojiOpen ? 'simple-popover' : undefined;

    return (
      <div className="chatinputbar" style={{width:'100%'}} >
      <form onSubmit={this.submitChat} style={style.chatInputBar}>
  

      <Button aria-describedby={id} variant="contained" color="primary" style={style.emojiButton}  onClick={this.openEmoji}>
        <InsertEmoticonIcon />
      </Button>

      <Popover
        id={id}
        open={this.state.emojiOpen}
        anchorEl={this.state.emojiOpen}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      
      >
      <Picker onSelect={this.onEmojiClick} showSkinTones={true} title='' emoji=''/>
      </Popover>
       
     
 
          <TextField id="outlined-basic" label="Message" variant="outlined" multiline  InputProps={{style: {backgroundColor: "white", color: "black" } }}
                     value={this.state.input} 
                     onChange={this.inputChange} 
                     style={style.inputBar} 
                     onKeyDown={(e) => enterPressed(e) }
                     inputRef={ this.inputRef} />

        </form>
      </div>
    );
  }
}

export default ChatInput;
