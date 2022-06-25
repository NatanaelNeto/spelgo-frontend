import React from 'react';

class AddWords extends React.Component {
  constructor () {
    super();
    this.state = { words: [], message: '' }

    this.handleState = this.handleState.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleState(event) {
    const words = event.target.value.split(" ");
    if(words.find(element => element.length !== 5)) {
      this.setState({ message: 'Todas as palavras precisam ter 5 letras' });
    }
    else {
      this.setState({ words, message: '' });
    }
  }

  async handleSend(event) {
    event.preventDefault();
    const { words, message } = this.state;
    const { token, updateState } = this.props;
    if(message.length === 0) {
      const payload = {
        method: 'POST',
        body: JSON.stringify({ palavras: words }),
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "authentication": token },
      }

      const data = await fetch('https://termo-crente.herokuapp.com/words', payload)
        .then(response => response.json());
      if (data.error) {
        this.setState({ message: `Erro no. ${data.error} - ${data.message}` });
        console.error(data);
      }
      else {
        await updateState();
      }
    }
  }

  render() {
    const { message } = this.state;
    return(
      <div className='block-container'>
        <h3>Cadastrar Palavras</h3>
        <span>Apenas palavras com 5 letras, separadas por espaço " "</span>
        <form>
          <input type='textarea' onChange={ this.handleState } />
          <button onClick={this.handleSend}>Enviar</button>
        </form>
        { message.length > 0 && <span>{ message }</span>}
      </div>
    )
  }
}

export default AddWords;
