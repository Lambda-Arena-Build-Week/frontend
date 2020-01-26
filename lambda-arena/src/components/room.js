import React from 'react';


export default class Room extends React.Component{
    constructor(props){
        super(props);
    }

    getStyle = (room) => {
        let wall = "2px solid #333";
        let top = "";
        let bottom = "";
        let left = ""; 
        let right = "";
        if(!room.n_to) top = wall
        if(!room.s_to) bottom = wall
        if(!room.e_to) right = wall
        if(!room.w_to) left = wall
        return {boxSizing: "border-box",
                display:"flex",
                justifyContent: "center",
                alignItems:"center",
                width: this.props.box_size.toString() + "px",
                height: this.props.box_size.toString() + "px",
                flex: "0 0 " + this.props.box_size.toString() + "px",
                fontSize:10,
                color: "#000000", 
                background: "#ffffff",
                borderTop: top,
                borderBottom: bottom,
                borderRight: right,
                borderLeft: left}
    }


    render(){
        
        const style = {
            active_circle : {
                width: (this.props.box_size * .60).toString() + "px",
                height: (this.props.box_size * .60).toString() + "px",
            },
            box_empty : {
                boxSizing: "border-box",
                width: this.props.box_size.toString() + "px",
                height: this.props.box_size.toString() + "px",
                flex: "0 0 " + this.props.box_size.toString() + "px",
                fontSize:10,
                color: "#000000", 
                background: "#999999"
            }
            
        }
        return (
            this.props.room 
            ? 
            <div style={this.getStyle(this.props.room)} key={this.props.uniq}>{this.props.active ? <div className="active-room" style={style.active_circle}></div> : this.props.room.rm_id}</div>
            :
            <div style={style.box_empty} key={this.props.uniq}></div>
        )
    }
}
