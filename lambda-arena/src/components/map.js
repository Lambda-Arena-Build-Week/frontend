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


        
       
    //     // set sample function to set player_ct for heat map
    //     setTimeout(function() {
    //         const newPlayerCt = [{"x": 3, "y": 2, "player_ct": 2}, {"x":2 , "y": 2, "player_ct": 1}, {"x": 9, "y": 8, "player_ct": 2}]
    //         let newGrid = this.state.grid.slice()
    //         newPlayerCt.forEach(newCt => {
    //             newGrid[newCt.x][newCt.y].player_ct = newCt.player_ct
    //         })
    //         this.setState({
    //             // active_rm: {"x":1, "y": -2},
    //             grid: newGrid,
    //             reverse: false
    //         })
    //         this.setActiveRoom(1, -2)
    //     }
    //     .bind(this),
    //      3000)

    //     setTimeout(function() {
    //         const newPlayerCt = [{"x": 3, "y": 2, "player_ct": 1}, {"x":3 , "y": 1, "player_ct": 2}, {"x":2 , "y": 2, "player_ct": 0}, {"x":3 , "y": 2, "player_ct": 1}, {"x": 9, "y": 8, "player_ct": 2}]
    //         let newGrid = this.state.grid.slice()
    //         newPlayerCt.forEach(newCt => {
    //             newGrid[newCt.x][newCt.y].player_ct = newCt.player_ct
    //         })
    //         this.setState({
    //             //active_rm: {"x":0, "y":-2},
    //             grid: newGrid,
    //             reverse: false
    //         })
    //     }
    //     .bind(this),
    //      6000)

    //      setTimeout(function() {
    //         const newPlayerCt = [{"x": 3, "y": 2, "player_ct": 0}, {"x": 3, "y": 3, "player_ct": 1},{"x":3 , "y": 1, "player_ct": 1}, {"x":4 , "y": 1, "player_ct": 1},{"x":2 , "y": 2, "player_ct": 0}, {"x":3 , "y": 2, "player_ct": 0}, {"x": 9, "y": 8, "player_ct": 0},{"x": 8, "y": 8, "player_ct": 2}]
    //         let newGrid = this.state.grid.slice()
    //         newPlayerCt.forEach(newCt => {
    //             newGrid[newCt.x][newCt.y].player_ct = newCt.player_ct
    //         })
    //         this.setState({
    //             active_rm: {"x":0, "y":-1},
    //             grid: newGrid,
    //             reverse: false
    //         })
    //     }
    //     .bind(this),
    //      10000) 

    //     //this.setPlayerCt([{"x": 3, "y": 2, "player_ct": 2}, {"x":2 , "y": 2, "player_ct": 1}, {"x": 9, "y": 8, "player_ct": 2}])
    //     //this.setPlayerCt([{"x": 3, "y": 2, "player_ct": 1}, {"x":3 , "y": 1, "player_ct": 2}, {"x":2 , "y": 2, "player_ct": 0}, {"x":3 , "y": 2, "player_ct": 1}, {"x": 9, "y": 8, "player_ct": 2}])

        this.setActiveRoom(3, 2)

    }

    //set heat map sample, need to adjust x y coordinates with x and y offset
    setPlayerCt = (positions) => {
        let newGrid = this.state.grid.slice()
        console.log(newGrid)
        positions.forEach(position => {
            newGrid[position.x][position.y].player_ct = position.player_ct
        })
        // newGrid[3][2].player_ct = 2;
        // newGrid[2][2].player_ct = 1;
        // newGrid[9][8].player_ct = 2;
        this.setState({ 
            grid: newGrid,
            reverse : false
        })
        console.log(this.state.grid[3][2].player_ct, this.state.grid[2][2].player_ct)
    }
        
    setActiveRoom = (x, y) => {
        this.setState({
            active_rm : {"x" : x , "y": y }, 
            reverse : false
        })
        // this.setState({
        //     active_rm : {"x" : 2, "y": 2}, 
        //     reverse : false
        // })

    }

    render() {
        let box_size = 350 / this.state.width;
        return (
            
            <div style={{width:400, display:"flex", flexWrap: "wrap", margin: "0 auto", padding: "5px"}}>
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