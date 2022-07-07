import '../style/Conjunto.css';
import React from "react";
import Tentativa from "./tentativa";

class Conjunto extends React.Component {
  constructor() {
    super();
    this.state = {
      linhaAtual: 1,
    }
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter (_correct) {
    const { qtd } = this.props;
    const { linhaAtual } = this.state;
    if (linhaAtual + 1 <= qtd) {
      this.setState({ linhaAtual: linhaAtual + 1 });
      return;
    }
    console.log("Fim de Jogo");
  }

  render() {
    const { qtd, palavra } = this.props;
    const { linhaAtual } = this.state;
    const tentativas = [];
    for (let i = 0; i < qtd; i += 1) {
      tentativas.push(
        <Tentativa
          key={i}
          linha={ i + 1 }
          linhaAtual={ linhaAtual }
          palavra={ palavra }
          onEnterPressed={ this.handleEnter }
        />
      );
    }
    return (
      <div className='conjunto'>
        { tentativas.map((item) => item) }
      </div>
    )
  }
}

export default Conjunto;
