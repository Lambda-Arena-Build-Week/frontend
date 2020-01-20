import React from 'react';
import Unity, { UnityContent } from "react-unity-webgl";


export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.unityContent = new UnityContent(
                'game/Build/game.json',
                'game/Build/UnityLoader.js')
    
    }

    render() {
        return(
            <Unity unityContent ={ this.unityContent } />
        )}
}