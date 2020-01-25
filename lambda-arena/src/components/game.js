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

    }

    render() {

        const style ={
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-evenly'
        }
        return(
            <div>
                <div style={{width: 960, height: 600, marginLeft: 0}}>
                    <Unity unityContent ={ this.unityContent } />
                </div>
                <Map />

                <div style={{width: "100%", height: 300}}>
                    <Chatroom style={{width:'100%'}} unity={this.unityContent}/>
                </div>
            </div>
        )}
}