import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import Chatroom from './chatroom/chatroom';

export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.unityContent = new UnityContent(
                'game/Build/game.json',
                'game/Build/UnityLoader.js');
        


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
                <div style={{width: 960, height: 600}}>
                    <Unity unityContent ={ this.unityContent } />
                </div>
               
            </div>
        )}
}