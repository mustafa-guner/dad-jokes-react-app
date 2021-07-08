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

        this.seenJokes = new Set(this.state.jokes.map(jk=>jk.jokes))

        this.handleUpvote = this.handleUpvote.bind(this);
        this.getJokes = this.getJokes.bind(this);
        this.generateJoke = this.generateJoke.bind(this)
        this.clearJokes = this.clearJokes.bind(this)
        
    }

    //  componentDidMount() {
    //     if(this.state.jokes.length === 0){
    //         this.getJokes()
    //         this.setState({
    //             loading:true
    //         })
    //     }
    // }

    /*componentDidUpdate(){
        this.setState(st=>({
            jokes:[...st.jokes,]
        }))
    }*/

    async getJokes() {
        let allJokes = [];
        for (let i = 0; i < this.state.limit; i++) {
            const response = await fetch("http://icanhazdadjoke.com", {
                headers: {
                    Accept: "application/json",
                },
            });
            const joke = await response.json();
            if(!this.seenJokes.has(joke.joke)){
                allJokes.push({ jokes: joke.joke, point: 0, id: joke.id });
            }
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

    clearJokes(){
        this.setState({
            jokes:[]
        })

        window.localStorage.clear();
    }
    render() {
        console.log(this.seenJokes.size)
        console.log(this.state.jokes.length)
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
                    <i class="fas fa-trash" onClick ={this.clearJokes}> Clear all</i>
                </div>
                {this.state.jokes.length === 0?<div className = "JokeList">
                    <div className = "message">
                        NO JOKES LEFT
                        
                    </div>     
                </div>:
                <JokeList jokes={this.state.jokes} handleUpVote={this.handleUpvote} />}
               
            </div>
        )
    }
}

export default JokeGenerator
