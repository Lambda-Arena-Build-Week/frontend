import React from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import TextField from "@material-ui/core/TextField";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";

class ChatInput extends React.Component {
  constructor(props) {
    super(props);

   
    this.state = {
      input: "",
      emojiOpen: false
    };

    this.inputRef = React.createRef();
  }
 
  inputChange = e => {
    if (typeof window.wsclient === "undefined" || window.wsclient === null)
      return;
    this.setState({ input: e.target.value });
  };

  submitChat = e => {
    e.preventDefault();
    if (typeof window.wsclient === "undefined" || window.wsclient === null)
      return;
    if (this.state.input.length > 0) {
      this.props.sendChatMessage({
        user: localStorage.getItem("gametag"),
        message: this.state.input
      });
      this.setState({ input: "" });
    }
  };

  onEmojiClick = emojiObject => {
    this.setState({
      input: this.state.input + emojiObject.native,
      emojiOpen: false
    });
    this.inputRef.current.focus();
  };

  openEmoji = () => {
    this.setState({ emojiOpen: !this.state.emojiOpen });
  };

  handleClose = () => {
    this.setState({ emojiOpen: false });
  };

  keyPressed = e => {
    if (typeof window.wsclient === "undefined" || window.wsclient === null)
      return;
    if (e.key === "Enter") {
      this.submitChat(e);
    }
  };

  setFocus = e => {
    
    this.inputRef.current.focus();
  };

  render() {
    const style = {
      emojiPopup: {
        visibility: !this.state.emojiOpen ? "hidden" : ""
      },
      emojiButton: {
        width: "5%",

        padding: "5px",
        marginRight: "5px",
        color: "white",
        font: "3.5rm",
        alignContent: "center",
        height:"50px",
      },
      chatInputBar: {
        width: "100%",
        display: "flex",
        flexDirection: "row",

        position: "relative"
      },
      inputBar: {
        width: "82%",
      }
    };

    const id = this.state.emojiOpen ? "simple-popover" : undefined;

    return (
      <div className="chatinputbar" style={{ width: "96%", height: "60px" }}>
        <Button
          aria-describedby={id}
          variant="contained"
          color="primary"
          style={style.emojiButton}
          onClick={this.openEmoji}
        >
          <InsertEmoticonIcon />
        </Button>

        <Popover
          id={id}
          open={this.state.emojiOpen}
          anchorEl={this.state.emojiOpen}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Picker
            onSelect={this.onEmojiClick}
            showSkinTones={true}
            title=""
            emoji=""
          />
        </Popover>
   
          <TextField
            id="outlined-basic"
            label="Message"
            variant="outlined"
            multiline
            InputLabelProps={{style: { transform: "translate(14px, 18px) scale(1)"}}}
            InputProps={{ style: { backgroundColor: "white", color: "black", height:"50px" } }}
            value={this.state.input}
            onChange={this.inputChange}
            style={style.inputBar}
            onKeyDown={this.keyPressed}
            ref={this.inputRef}
          />
   
      </div>
    );
  }
}

export default ChatInput;