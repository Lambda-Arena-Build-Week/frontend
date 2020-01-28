import React from 'react';
import axios from 'axios';
import Room from './room';
  
import { UnityContent } from "react-unity-webgl";

export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            grid: null,
            active_rm : {"x":null, "y":null},
            min_x : 0,
            max_x : 0,
            min_y : 0,
            max_y : 0,
            width : 0,
            height : 0,
            reverse : true
        }
        this.mapLoaded = false;
        this.unityContent = new UnityContent(
          "MyGame/Build.json",
          "MyGame/UnityLoader.js"
        );

        
        this.playerX = 0;
      this.playerY = 0;

    this.unityContent.on("updatemapx", msg => {
       this.playerX = msg;
    });

    this.unityContent.on("updatemapy", msg => {
  
        this.playerY = msg;

        this.setActiveRoom(this.playerX, this.playerY );
     
    });
    } 

    componentDidMount() {
        axios
        .get("https://lambdamud-2020-staging.herokuapp.com/api/gameworld/")
        .then(res => {
            this.setMinMax(res.data)
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

        this.mapLoaded = true;
    }

    //set heat map sample, need to adjust x y coordinates with x and y offset
    setPlayerCt = (positions) => {
        let newGrid = this.state.grid.slice()
        console.log(newGrid)
        positions.forEach(position => {
            newGrid[position.x][position.y].player_ct = position.player_ct
        })

        this.setState({ 
            grid: newGrid,
            reverse : false
        })
        console.log(this.state.grid[3][2].player_ct, this.state.grid[2][2].player_ct)
    }
        
    setActiveRoom = (x, y) => {
      
      if (this.mapLoaded === false)
        return;
      
        this.setState({
            active_rm : {"x" : x , "y": y }, 
            reverse : false
        })

    }

    render() {
        let box_size = 350 / this.state.width;
        return (
            
          <div style={{width:350, display:"flex", flexWrap: "wrap", margin: "0 auto", padding: "10px 25px 25px"}}>   
             {this.state.grid == null ? 
                "Generating Map" 
                : 
                this.state.reverse
                ? 
                
                this.state.grid.reverse().map((col) => {
                    return col.map((room, key)=> {
                        const active = room ? room.x === this.state.active_rm["x"] && room.y === this.state.active_rm["y"] ? true : false : false  
                        return <Room room={room} box_size={box_size} uniq={key} active={active}/>
                    })
                })
                :
                this.state.grid.map((col) => {
                    return col.map((room, key)=> {
                        const active = room ? room.x === this.state.active_rm["x"] && room.y === this.state.active_rm["y"] ? true : false : false  
                        return <Room room={room} box_size={box_size} uniq={key} active={active}/>
                    })
                })
                }
            </div>
        )

    }
}
