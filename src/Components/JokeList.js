import React, { Component } from 'react'
import Joke from './Joke'
import "../JokeList.css";

export class JokeList extends Component {
    render() {
        console.log(this.props.jokes)
        return (
           
            <div className ="JokeList">
                <ul>
                  {
                      this.props.jokes.map(joke=>(
                          <Joke upvote = {this.props.handleUpVote} id={joke.id} key = {joke.id} joke = {joke.jokes} point = {joke.point}/>
                      ))
                  }
                </ul>
            </div>
        )
    }
}

export default JokeList
