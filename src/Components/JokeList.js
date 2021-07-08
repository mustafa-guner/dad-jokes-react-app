import React, { Component } from 'react'
import Joke from './Joke'
import "../JokeList.css";

export class JokeList extends Component {
    render() {
        const jokes = this.props.jokes.sort((a,b)=>b.point - a.point);
        return (
           
            <div className ="JokeList">
                <ul>
                  {
                      jokes.map(joke=>(
                          <Joke upvote = {this.props.handleUpVote} id={joke.id} key = {joke.id} joke = {joke.jokes} point = {joke.point}/>
                      ))
                  }
                </ul>
            </div>
        )
    }
}

export default JokeList
