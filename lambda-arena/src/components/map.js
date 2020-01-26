import React from 'react';
import axios from 'axios';
import Room from './room';

export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            grid: null,
            active_rm : {"x":1, "y":-3},
            min_x : 0,
            max_x : 0,
            min_y : 0,
            max_y : 0,
            width : 0,
            height: 0,
        }
    } 

    componentDidMount() {
        axios
        .get("https://lambdamud-2020-staging.herokuapp.com/api/gameworld/")
        .then(res => {
            this.setMinMax(res.data)
            //console.log(this.state.min_x, this.state.max_x, this.state.min_y, this.state.max_y, this.state.width, this.state.height)
            this.generatingMap(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    setMinMax = (rooms) => {
       rooms.forEach(room => {
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

    generatingMap = (rooms) => {
        let grid = []
        for (let i = 0; i < this.state.height ; i ++){
            grid[i] = []
           for (let j = 0; j < this.state.width; j ++){
               grid[i][j] = null
           }
        }
        let x_offset = Math.abs(this.state.min_x)
        let y_offset = Math.abs(this.state.min_y)

        rooms.forEach(room => {
            grid[room.y + y_offset][room.x + x_offset] = room
        })
        this.setState({
            grid : grid
        })
        console.log(this.state.grid)
    }

    setActiveRoom = (x, y) => {
        this.setState({
            active_room : {"x" : x, "y": y}
        })
    }

    render() {
        //let box_size = (this.state.width > this.state.height ? 400 / this.state.width : 400 / this.state.height) + "px"
        let box_size = this.state.width > this.state.height ? 400 / this.state.width : 400 / this.state.height
        return (
            
            <div style={{width:400, display:"flex", flexWrap: "wrap", margin: "0 auto", padding: "5px"}}>
                {this.state.grid == null ? 
                "Generating Map" 
                : 
                this.state.grid.reverse().map((col) => {
                    return col.map((room, key)=> {
                        const active = room ? room.x == this.state.active_rm["x"] && room.y == this.state.active_rm["y"] ? true : false : false  
                        return <Room room={room} box_size={box_size} uniq={key} active={active}/>
                    })
                })
                }
            </div>
        )

    }
}
