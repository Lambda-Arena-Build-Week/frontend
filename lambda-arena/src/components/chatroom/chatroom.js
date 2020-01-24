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
      console.log(chat);
      this.setState({
        chatMessages: [...this.state.chatMessages, JSON.stringify(chat)]
      });
    });
  }

  componentDidMount() {}

  sendChatMessage = msg => {
    //this.addChatMessage(msg);
    this.unityContent.send(
      "Multiplayer",
      "ChatMessage",
      JSON.stringify({ message: "chat", chat: msg })
    );
  };

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
          <div style={{ width: "100%", height: "100px" }}>
            <ChatInput sendChatMessage={this.sendChatMessage} />
          </div>
        </div>
      </Paper>
    );
  }
}

export default Chatroom;
