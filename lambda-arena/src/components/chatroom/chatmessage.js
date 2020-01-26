import React from "react";

class ChatMessage extends React.Component {

  render(){

    const style = {
        chatMessage: {
            width: '99%',
            fontSize: '1rem',
            textAlign: 'flex-start',
            justifyContent: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            padding: '5px',
            backgroundColor: this.props.color,
        },
        username:{
            padding: '3px',
            textAlign: 'left',
            fontWeight: 'bold'
        },
        message:{
            padding: '3px',
            overflowWrap: 'break-word',
            textAlign: 'left',
            height:"auto"
        }
    }
      return (
        <div className="chatmessage" style={style.chatMessage}>
            <span style={style.username}>{this.props.msg.user}</span>
            <span style={style.message}>{this.props.msg.message}</span>
        </div>
      );
  }
}

export default ChatMessage;