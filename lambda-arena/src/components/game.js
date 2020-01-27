import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import Chatroom from './chatroom/chatroom';
import Map from './map';
import axios from 'axios';

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
            width: '100%',
            justifyContent: 'center',
            marginTop:"50px"
        }
        return (

            <div style={style}>
                <div style={{width: 1060, height: 600}} tabIndex={1} onFocus={this.gotFocus} onBlur={this.lostFocus}>
                    <Unity unityContent ={ this.unityContent } ref={this.unityRef}  />
                </div>
                <div>
                  <Map />
                  <div style={{width: 350, padding: "0 25px"}}>
                    <Chatroom style={{width:'100%', zIndex: 1}} unity={this.unityContent}/>
                </div>
              </div>
                
            </div>
        )}
}