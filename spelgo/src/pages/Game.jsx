import React from "react";
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

    const currDate = new Date();
    const dia = currDate.getUTCDate();
    const mes = currDate.getUTCMonth();
    const ano = currDate.getUTCFullYear();

    const fulldate = (parseInt("" + dia + mes + ano)) * dia * mes * ano;
    let currwords = [];

    for (let i = 0; i < quantity; i += 1) {
      const index = ((fulldate ** (2 * (i + 1))) * quantity) % words.length;
      currwords.push(words[index]);
    }

    currwords = currwords.filter((item, index) => currwords.indexOf(item) === index);
    console.log(currwords);

    return (
      <div>
        <Header active = {active} />
      </div>
    )
  }
}

export default Game;
