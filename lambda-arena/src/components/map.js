import React from 'react';

export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rooms : [],
            active_rm : null,
            min_x : 0,
            max_x : 0,
            min_y : 0,
            max_y : 0
        }
    } 
    
    render() {
        return (
            <div>
                MAP
            </div>
        )
    }
}
