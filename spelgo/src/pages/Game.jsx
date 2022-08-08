import React from "react";
import Conjunto from "../components/conjunto";
import Grid from "../components/Grid";
import Header from '../components/header';
import OpenScreen from "./OpenScreen";

import '../style/Grid.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      words: [],
      currWords: [],
    };

    this.fetchWords = this.fetchWords.bind(this);
    this.verifyOnDB = this.verifyOnDB.bind(this);
  }

  componentDidMount() {
    this.fetchWords();
  }

  async fetchWords() {
    const payload = {
      method: 'GET',
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    };
    const data = await fetch('https://termo-crente.herokuapp.com/words', payload)
      .then(response => response.json());
    const { words } = data;
    const { quantity } = this.props;
    const PRIME = 27644437;

    const currDate = new Date();
    const dia = currDate.getUTCDate();
    const mes = currDate.getUTCMonth();
    const ano = currDate.getUTCFullYear();

    const fulldate = (parseInt("" + dia + mes + ano)) * dia * mes * ano;
    const todayWords = [];
    const currWords = [];

    for (let i = 1; i <= 10; i += 1) {
      let trial = 0;
      let index = (fulldate * i + (PRIME * trial)) % words.length;
      while(todayWords.includes(words[index])) {
        trial += 1;
        index = (fulldate * i + (PRIME * trial)) % words.length;
      }
      todayWords.push(words[index]);
    } 

    for (let i = 0; i < quantity; i += 1) {
      currWords.push(todayWords[i + this.startIndex(quantity)]);
    }

    this.setState({ words, currWords });
  }

  startIndex (qtd) {
    return ((qtd ** 2) - qtd) / 2;
  }

  verifyOnDB(palavra) {
    const { words } = this.state;
    const resp = words.find((word) => word.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase() === palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
    return resp;
  }

  

  render() {
    const { active, quantity } = this.props;
    const { currWords } = this.state;

    const conjuntos = [];
    for (let i = 0; i < currWords.length; i += 1) {
      conjuntos.push(<Conjunto key={ i } qtd={ 5 + parseInt(quantity) } palavra={ currWords[i] } verificador={ this.verifyOnDB } />);
    }

    return active ?
      (
        <div>
          <Header active = {active} />
          <div className="game-content">
            { currWords.length > 0 ? conjuntos.map((item) => item) : <h3>Carregando...</h3> }
          </div>
            {/* <div className="game-grid">
              <Grid classes={ [] }/>
            </div> */}
        </div>
      ) :
      (
        <div>
          <Header />
          <OpenScreen />
        </div>
      )
  }
}

export default Game;
