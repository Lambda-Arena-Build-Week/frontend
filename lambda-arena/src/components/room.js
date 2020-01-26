import React from 'react';


export default class Room extends React.Component{
    constructor(props){
        super(props);
    }

    getStyle = (room) => {
        let wall = "2px solid #565656";
        return {
                width: this.props.box_size.toString() + "px",
                height: this.props.box_size.toString() + "px",
                flex: "0 0 " + this.props.box_size.toString() + "px",
                borderTop: !room.n_to ? wall : "",
                borderBottom: !room.s_to ? wall : "", 
                borderRight: !room.e_to ? wall : "",
                borderLeft: !room.w_to ? wall : "",
                background: room.player_ct > 0 ? "#fcc" : "#fff",
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
            <div className="active-room-style" style={this.getStyle(this.props.room)} key={this.props.uniq}>{this.props.active ? <div className="active-room" style={style.active_circle}></div> : this.props.room.rm_id}</div>
            :
            <div className="empty-room-style" style={style.box_empty} key={this.props.uniq}></div>
        )
    }
}
