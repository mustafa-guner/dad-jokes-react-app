import React, { Component } from 'react'
import JokeList from './JokeList'
import "../Jokesboard.css";

export class JokeGenerator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            limit: 10,
            loading:false
        }
        this.handleUpvote = this.handleUpvote.bind(this);
        this.getJokes = this.getJokes.bind(this);
        this.generateJoke = this.generateJoke.bind(this)
    }

     componentDidMount() {
        if(this.state.jokes.length === 0) this.getJokes()

    }

    async getJokes() {
        let allJokes = [];
        for (let i = 0; i < this.state.limit; i++) {
            const response = await fetch("http://icanhazdadjoke.com", {
                headers: {
                    Accept: "application/json",
                },
            });
            const joke = await response.json();
            allJokes.push({ jokes: joke.joke, point: 0, id: joke.id });
           
        }

        this.setState(state => ({
           jokes:[...state.jokes,...allJokes],
           loading:false 
        }),()=>window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes)));

        // window.localStorage.setItem("jokes",JSON.stringify(allJokes));
    }

    generateJoke(){
        this.setState({
            loading:true
        })
        this.getJokes();
    }

    handleUpvote(id, delta) {
        this.setState(state => ({
            jokes: state.jokes.map(joke => {
                return joke.id === id ? { ...joke, point: joke.point + delta } : joke
            })
            //callback ile yukardaki UPDATELENDIGI ZAMAN (UPVOTE ya da DOWNVOTE) oldugunda
            //puanlanan sakayi local storage'e saveleme icin yazdim

            //Bunu yazmadan puanlandiktan sonra refresh edildiginde puanlar gaybolurdu.
        }),()=>window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes))
        )
    }

    render() {
        if(this.state.loading){
            return(
                <div className="loading">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1>Loading..</h1>
                </div>
            )
        }
        return (
            <div className="Jokesboard">
                <div className="jokes-generator">
                    <h1>Dad <span>Jokes</span></h1>
                    <div className="smile-ico">
                        <p>😂</p>
                    </div>
                    <button onClick={this.generateJoke}>New Jokes</button>
                </div>
                <JokeList jokes={this.state.jokes} handleUpVote={this.handleUpvote} />
            </div>
        )
    }
}

export default JokeGenerator
