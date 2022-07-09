import '../style/Conjunto.css';
import React from "react";
import Tentativa from "./tentativa";

class Conjunto extends React.Component {
  constructor() {
    super();
    this.state = {
      linhaAtual: 1,
      classes:[],
      palavrasUsadas: [],
    }
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount () {
    const { qtd } = this.props;
    const classes = [];
    const palavrasUsadas = [];
    for (let i = 0; i < qtd; i += 1) {
      classes.push(['', '', '', '', '']);
      palavrasUsadas.push('');
    }
    this.setState({ classes, palavrasUsadas });
  }

  handleEnter (correct, callback) {
    const { qtd, verificador, palavra } = this.props;
    const { linhaAtual, classes, palavrasUsadas } = this.state;
    const currPalavra = verificador(correct);
    const letras = palavra.split('').map((letra) => letra.toUpperCase());
    
    if (!currPalavra) {
      return;
    }
    palavrasUsadas[linhaAtual - 1] = currPalavra;
    let acertos = 0;
    for (let i = 0; i < 5; i += 1) {
      if (palavra[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase() === currPalavra[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase()) {
        acertos += 1;
        classes[linhaAtual - 1][i] = 'correct';
      }
      else if (letras.includes(currPalavra[i].toUpperCase())) {
        letras.splice(letras.indexOf(currPalavra[i].toUpperCase()), 1);
        classes[linhaAtual - 1][i] = 'wrong-position';
      }
    }

    let newLinha;
    if (acertos === 5) {
      // Acertou
      newLinha = - 1;
    }
    else if (linhaAtual + 1 <= qtd) {
      // Errou
      newLinha = linhaAtual + 1;
    }
    else {
      // Perdeu
      newLinha = - 1;
    }
    this.setState({ linhaAtual: newLinha, classes, palavrasUsadas }, () => {
      callback();
    });
  }

  

  render() {
    const { qtd } = this.props;
    const { linhaAtual, classes, palavrasUsadas } = this.state;
    const tentativas = [];
    for (let i = 0; i < qtd; i += 1) {
      tentativas.push(
        <Tentativa
          key={i}
          linha={ i + 1 }
          linhaAtual={ linhaAtual }
          palavra={ palavrasUsadas[i] }
          classes={ classes[i] }
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
