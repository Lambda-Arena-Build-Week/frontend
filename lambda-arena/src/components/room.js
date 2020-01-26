import React from 'react';


export default class Room extends React.Component{
    constructor(props){
        super(props);
    }

    getStyle = (room) => {
        let wall = "2px solid #565656";
        let top = "";
        let bottom = "";
        let left = ""; 
        let right = "";
        let bk = room.player_ct > 0 ? "#fcc" : "#ffffff";
        if(!room.n_to) top = wall
        if(!room.s_to) bottom = wall
        if(!room.e_to) right = wall
        if(!room.w_to) left = wall
        return {
                width: this.props.box_size.toString() + "px",
                height: this.props.box_size.toString() + "px",
                flex: "0 0 " + this.props.box_size.toString() + "px",
                borderTop: top,
                borderBottom: bottom,
                borderRight: right,
                borderLeft: left,
                background: bk,
            }
    }


    render(){
        
        const style = {
            active_circle : {
                width: (this.props.box_size * .60).toString() + "px",
                height: (this.props.box_size * .60).toString() + "px",
            },
            box_empty : {
                width: this.props.box_size.toString() + "px",
                height: this.props.box_size.toString() + "px",
                flex: "0 0 " + this.props.box_size.toString() + "px",
            }
            
        }
        return (
            this.props.room 
            ? 
            <div className="active-room-style" style={this.getStyle(this.props.room)} key={this.props.uniq}>{this.props.active ? <div className="active-room" style={style.active_circle}></div> : null}</div>
            :
            <div className="empty-room-style" style={style.box_empty} key={this.props.uniq}></div>
        )
    }
}
