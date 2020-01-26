import React from "react";
import ChatInput from "./chatinput";
import ChatWindow from "./chatwindow";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Unity, { UnityContent } from "react-unity-webgl";

class Chatroom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatMessages: []
    };

    this.unityContent = new UnityContent(
      "game/Build/game.json",
      "game/Build/UnityLoader.js"
    );

    this.unityContent.on("chat", chat => {
 
      this.setState({
        chatMessages: [...this.state.chatMessages, JSON.parse(chat)]
      });
    });
  }

  componentDidMount() {}

  sendChatMessage = msg => {
    if ((typeof window.wsclient === "undefined") || (window.wsclient === null))
      return;

    window.wsclient.send(
     JSON.stringify({ message: "chat", chat: JSON.stringify(msg) })
    );
  }
  

  render() {
    const style = {
      chat: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
      
        padding: "0px",
        margin: "5px"
      }
    };
    return (
      <Paper className="chat" style={style.chat} elevation={3}>
        <div style={style.chat}>
          <div style={{ width: "100%", height: "500px" }}>
            <ChatWindow chatMessages={this.state.chatMessages} />
          </div>
        </div>
        

          <div style={{ width: "100%", height: "100px" }}>
            <ChatInput sendChatMessage={this.sendChatMessage} />
          </div>
          </Paper>
      
    );
  }
}

export default Chatroom;
