import React from "react";
import ChatMessage from './chatmessage';

class ChatWindow extends React.Component {
    

    render(){

        const msgColor = ['white', 'lightgray'];

        const style = {
            chatWindow: {
 
                width: '100%',
                height:' 100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                backgroundColor: 'white',
                color: 'black',
                display: 'flex',
                flexDirection: 'column-reverse',
                fontSize: '1rem',
                textJustify: 'left',
                position: "relative",
                paddingBottom: '5px'
            }
        }

        return (
        <div className="chatwindow" style={style.chatWindow}>
            {[...this.props.chatMessages].reverse().map( (msg, index) => {
                return (<ChatMessage key={index} msg={msg} color={msgColor[index % 2 + this.props.chatMessages.length % 2]}/>)
            })}
        </div>
      );
  }


}

export default ChatWindow;