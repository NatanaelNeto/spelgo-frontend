import '../style/Conjunto.css';
import React from "react";
import Tentativa from "./tentativa";

class Conjunto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linhaAtual: 1,
      classes:[],
      palavrasUsadas: [],
    }
    this.handleEnter = this.handleEnter.bind(this);

    this.child = React.createRef();
  }

  componentDidMount () {
    const { qtd, palavra } = this.props;
    console.log(palavra);
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
      if (palavra[i].toUpperCase() === currPalavra[i].toUpperCase()) {
        acertos += 1;
        classes[linhaAtual - 1][i] = 'correct';
        letras.splice(letras.indexOf(currPalavra[i].toUpperCase()), 1);
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
    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key':'ArrowRight'
    }));
    const { qtd } = this.props;
    const { linhaAtual, classes, palavrasUsadas } = this.state;
    const tentativas = [];
    for (let i = 0; i < qtd; i += 1) {
      i === linhaAtual ? 
      tentativas.push(
        <Tentativa
          key={i}
          ref={ this.child }
          linha={ i + 1 }
          linhaAtual={ linhaAtual }
          palavra={ palavrasUsadas[i] }
          classes={ classes[i] }
          onEnterPressed={ this.handleEnter }
        />
      )
      : tentativas.push(
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
    this.child.current && this.child.current.getAlert();
    console.log(this.child.current);
    return (
      <div className='conjunto'>
        { tentativas.map((item) => item) }
      </div>
    )
  }
}

export default Conjunto;
