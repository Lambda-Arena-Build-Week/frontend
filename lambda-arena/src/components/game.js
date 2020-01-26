import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import Chatroom from './chatroom/chatroom';

export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.unityContent = new UnityContent(
                'game/Build/game.json',
                'game/Build/UnityLoader.js');
        
                
                this.unityRef = React.createRef();
    }

    gotFocus = e => {
    
        this.unityContent.send("Multiplayer", "CaptureKeyboard", "1")
      };

    lostFocus = e => {
        this.unityContent.send("Multiplayer", "CaptureKeyboard", "0")
    }

      
    render() {

        const style ={
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-evenly'
        }
        return(
            <div style={style}>
                <div style={{width: 960, height: 600}} tabIndex={1} onFocus={this.gotFocus} onBlur={this.lostFocus}>
                    <Unity unityContent ={ this.unityContent } ref={this.unityRef}  />
                </div>
                <div style={{width: 800, height: 600}}>
                    <Chatroom style={{width:'100%', zIndex: 1}} unity={this.unityContent}/>
                </div>
            </div>
        )}
}