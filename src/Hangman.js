import React, { Component } from 'react';
import "./Hangman.css";
import { randomWord } from './words'
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

class Hangman extends Component {

    static defaultProps = {
        numWrongsAllowed : 6,
        images : [img0,img1,img2,img3,img4,img5,img6]
    }

    constructor(props){
        super(props);
        this.state = {
            nWrongs : 0,
            guessed : new Set(),
            answer : randomWord()
        }
        this.handleClick = this.handleClick.bind(this);
        this.reset = this.reset.bind(this);
    }

    // Reset state,  since no dependence on prev state, callback not needed
    reset() {
        this.setState({
            nWrongs: 0,
            guessed: new Set(),
            answer: randomWord()
        })
    }

    handleClick(evn) {
        let ltr = evn.target.value;
        this.setState(prevState => {
            return {
                guessed : prevState.guessed.add(ltr),
                nWrongs : prevState.nWrongs + (prevState.answer.includes(ltr) ? 0 : 1)
            }
        })
    }

    //Generate guessed word
    guessedWord(){
        return this.state.answer
                .split("")
                .map(ltr => this.state.guessed.has(ltr) ? ltr : "_")
    }

    // Generate the button group 
    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz"
            .split("")
            .map(ltr => {
                return (
                <button 
                key = {ltr}
                value = {ltr}
                disabled = {this.state.guessed.has(ltr)}
                onClick = {this.handleClick}>{ltr}</button>)
            });
    }

    render() {
        const gameOver = this.state.nWrongs >= this.props.numWrongsAllowed;
        const altText = `${this.state.nWrongs}/${this.props.numWrongsAllowed} guesses`;
        let winner = this.guessedWord().join("") === this.state.answer;
        let gameState = this.generateButtons();
        if(gameOver) gameState = 'You Lose';
        if(winner) gameState = 'You Win';

        return (
            <div className="Hangman">
                <h1>Hangman</h1>
                <img src={this.props.images[this.state.nWrongs]} alt={altText}/>
                <p> Guessed Wrong : {this.state.nWrongs}</p>
                <div className="Hangman-word">{!gameOver ? this.guessedWord() : this.state.answer}</div>
                <div className="Hangman-btns">{gameState}</div>
                <button id="reset" onClick={this.reset}>Reset</button>
            </div>
        );
    }
}

export default Hangman;