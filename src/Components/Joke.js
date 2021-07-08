import React, { Component } from 'react'
import "../Joke.css";

export class Joke extends Component {
    constructor(props){
        super(props);

        this.state = {point:0}

        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
        this.getColor = this.getColor.bind(this);
        this.getEmoji = this.getEmoji.bind(this);
    }

    getColor(){
        if(this.props.point >=15){
            return "#4CAF50";
        }
        else  if(this.props.point >=12){
            return "#8bc34a";
        }
        else  if(this.props.point >=9){
            return "#cddc39";
        }
        else  if(this.props.point >=6){
            return "#ffeb3b";
        }
        else  if(this.props.point >=3){
            return "#ffc107";
        }
        else  if(this.props.point >=0){
            return "#ff9800";
        }
        else{
            return "#f44336";
        }
    }

    getEmoji(){
        if(this.props.point >=15){
            return "🤣";
        }
        else  if(this.props.point >=12){
            return "😆";
        }
        else  if(this.props.point >=9){
            return "😄";
        }
        else  if(this.props.point >=6){
            return "🙃";
        }
        else  if(this.props.point >=3){
            return "😏";
        }
        else  if(this.props.point >=0){
            return "😖";
        }
        else{
            return "🥶";
        }
    }
 
    upVote(){
       this.props.upvote(this.props.id,1)
    }

    downVote(){
        this.props.upvote(this.props.id,-1)
     }
 

    render() {
        
        return (
            <li className = "Joke">
                <div className="points">
                    <div className="vote upvote" onClick = {this.upVote}>
                        ▲
                    </div>
                    <div className="point" style = {{border:`3px solid ${this.getColor()}`}}>
                        {this.props.point}
                    </div>
                    <div className ="vote downvote" onClick = {this.downVote}>
                        ▼
                    </div>
                </div>
                <div className="joke">
                   {this.props.joke}
                </div>
                <div className="face-icon">
                    {this.getEmoji()}
                </div>
            </li>
        )
    }
}

export default Joke
