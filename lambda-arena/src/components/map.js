import React from 'react';
import axios from 'axios';
import { FormHelperText } from '@material-ui/core';


export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rooms : null,
            active_rm : null,
            min_x : 0,
            max_x : 0,
            min_y : 0,
            max_y : 0,
            width : 0,
            height: 0,
            temp_rm : {},
            grid: null
        }
    } 

    componentDidMount() {
        axios
        .get("https://lambdamud-2020-staging.herokuapp.com/api/gameworld/")
        .then(res => {
            this.setState({
                rooms : res.data,
                temp_rm : res.data[0]
            })
            console.log(this.state.rooms[3])

            this.setMinMax()

            console.log(this.state.min_x, this.state.max_x, this.state.min_y, this.state.max_y, this.state.width, this.state.height)

            this.generatingMap()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    setMinMax = () => {
        this.state.rooms.forEach(room => {
            this.setState({
                min_x : room.x < this.state.min_x ? room.x : this.state.min_x,
                max_x : room.x > this.state.max_x ? room.x : this.state.max_x,
                min_y : room.y < this.state.min_y ? room.y : this.state.min_y,
                max_y : room.y > this.state.max_y ? room.y : this.state.max_y
            })
        })    
        this.setWidHt()
    }

    setWidHt = () => {
        this.setState({
            width : Math.abs(this.state.min_x) + this.state.max_x + 1,
            height : Math.abs(this.state.min_y) + this.state.max_y + 1
        })
    }

    generatingMap = () => {
        let grid = []
        for (let i = 0; i < this.state.height ; i ++){
            grid[i] = []
           for (let j = 0; j < this.state.width; j ++){
               grid[i][j] = null
           }
        }
        let x_offset = Math.abs(this.state.min_x)
        let y_offset = Math.abs(this.state.min_y)

        this.state.rooms.forEach(room => {
            grid[room.y + y_offset][room.x + x_offset] = room
        })
        this.setState({
            grid : grid
        })
        console.log(this.state.grid)
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
                width: "50px",
                height: "50px",
                flex: "0 0 50px",
                fontSize:10,
                color: "#000000", 
                background: "#ffffff",
                borderTop: top,
                borderBottom: bottom,
                borderRight: right,
                borderLeft: left}
    }


    render() {
        let box_size = this.state.width > this.state.height ? 600 /this.state.width : 600 / this.state.height
        const style = {
            box : {
                boxSizing: "border-box",
                width: "50px",
                height: "50px",
                flex: "0 0 50px",
                fontSize:10,
                color: "#000000", 
                background: "#ffffff",
            },
            box_empty : {
                boxSizing: "border-box",
                width: "50px",
                height: "50px",
                flex: "0 0 50px",
                fontSize:10,
                color: "#000000", 
                background: "#999999"
            }
            
        }
        return(
            

        <div style={{width:600, display:"flex", flexWrap: "wrap", margin: "0 auto"}}>{this.state.grid == null ? 
            "Generating Map" 
            : 
            this.state.grid.reverse().map((col, key) => {
                return col.map((room, key )=> {
                return room ? <div style={this.getStyle(room)}>{room.rm_id}</div> : <div style={style.box_empty}></div>
                })

            })}</div>
        )

        
    }
}
