import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { randomMots } from './Mots.js';

class Game extends Component {
  static defaultProps = {
    ErreurMax: 8 ,
    images: []
  }

  constructor(props) {
    super(props);
    this.state = {
      erreur: 0,
      find: new Set([]),
      reponse: randomMots()
    }
  }

  handleGuess = e => {
    let letter = e.target.value;
    this.setState(st => ({
      find: st.find.add(letter),
      erreur: st.erreur + (st.reponse.includes(letter) ? 0 : 1)
    }));
  }

  findMots() {
    return this.state.reponse.split("").map(letter => (this.state.find.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <Button 
        class='btn btn-primary'
        size="sm"
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.find.has(letter)}
      >
        {letter}
      </Button>
    ));
  }

  resetButton = () => {
    this.setState({
      erreur: 0,
      find: new Set([]),
      reponse: randomMots()
    });
  }

  render() {
    const gameOver = this.state.erreur >= this.props.ErreurMax;
    const isWinner = this.findMots().join("") === this.state.reponse;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = "Bravo, c'est gagné!"
    }

    if (gameOver) {
      gameStat = "Dommage, c'est perdu..."
    }

    return (
      <div className="Hangman container">
        <h1 className='text-center'>Jeu du Pendu</h1>
        <div className="float-right">Nombre de fautes: {this.state.erreur} sur {this.props.ErreurMax}</div>
        <br></br>
        <div className="text-center">
          <p>Trouvez le mot !</p>
          <p>
            {!gameOver ? this.findMots() : this.state.reponse}
          </p>
          <p>{gameStat}</p>
        </div>
      </div>
    )
  }
}

export default Game;