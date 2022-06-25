import React from 'react';

class Words extends React.Component {
  constructor() {
    super();
    this.state = {
      words: [],
    }

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
    const { words } = this.state;
    // const { token } = this.props;
    return (
      <div className='lista'>
        <h3>Palavras cadastradas</h3>
        <ul>
          { words.map((item) => <li>{ item }</li>)}
        </ul>
      </div>
    )
  }
}

export default Words;
