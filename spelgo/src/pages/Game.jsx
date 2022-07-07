import React from "react";
import Conjunto from "../components/conjunto";
import Header from '../components/header';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      words: [],
    };

    this.fetchWords = this.fetchWords.bind(this);
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
    this.setState({ words });
  }

  render() {
    const { active, quantity } = this.props;
    const { words } = this.state;
    const PRIME = 27644437;

    const currDate = new Date();
    const dia = currDate.getUTCDate();
    const mes = currDate.getUTCMonth();
    const ano = currDate.getUTCFullYear();

    const fulldate = (parseInt("" + dia + mes + ano)) * dia * mes * ano;
    let currwords = [];

    for (let i = 0; i < quantity && words.length > 0; i += 1) {
      const index = (fulldate * quantity * (PRIME ** (2 * (i + 1)))) % words.length;
      currwords.push(words[index]);
    }

    currwords = currwords.filter((item, index) => currwords.indexOf(item) === index);

    const conjuntos = [];
    for (let i = 0; i < currwords.length; i += 1) {
      conjuntos.push(<Conjunto key={i} qtd={ 5 + parseInt(quantity) } palavra={currwords[i]} />);
    }

    return active ?
      (
        <div>
          <Header active = {active} />
          <div className="game-content">
            { currwords.length > 0 ? conjuntos.map((item) => item) : <h3>Carregando...</h3> }
          </div>
        </div>
      ) :
      (
        <div>
          <Header />
        </div>
      )
  }
}

export default Game;
