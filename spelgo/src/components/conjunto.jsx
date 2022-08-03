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
      complete: false,
    }
    this.handleEnter = this.handleEnter.bind(this);

    this.child = React.createRef();
  }

  compareAB(a, b) {
    return a.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase() === b.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase()
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

  findOnArray(arr, letter) {
    for (let i = 0; i < arr.length; i += 1) {
      if (this.compareAB(arr[i], letter)) return true;
    }
    return false;
  }

  handleEnter (correct, callback) {
    const { qtd, verificador, palavra } = this.props;
    const { linhaAtual, classes, palavrasUsadas } = this.state;
    const curr = verificador(correct);
    const letras = palavra.split('').map((letra) => letra.toUpperCase());
    let comp = false;
    if (!curr) {
      return;
    }

    const currPalavra = curr.split('');
    palavrasUsadas[linhaAtual - 1] = currPalavra;
    let acertos = 0;
    const posVerified = [];

    // VERIFICA SE HÁ LETRAS NA POSIÇÃO CORRETA
    for (let i = 0; i < 5; i += 1) {
      if (this.compareAB(palavra[i], currPalavra[i])) {
        acertos += 1;
        classes[linhaAtual - 1][i] = 'correct';
        letras[i] = '';
        posVerified.push(i);
      }
    }

    // VERIFICA SE, DAS LETRAS RESTANTES, HÁ ALGUMA NA POSIÇÃO ERRADA
    for (let i = 0; i < 5; i += 1) {
      if (!posVerified.some((pos) => Number(pos) === i) && this.findOnArray(letras, currPalavra[i])) {
        letras[letras.indexOf(currPalavra[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase())] = '';
        classes[linhaAtual - 1][i] = 'wrong-position';
      }
    }

    let newLinha;
    if (acertos === 5) {
      // Acertou
      newLinha = - 1;
      comp = true;
    }
    else if (linhaAtual + 1 <= qtd) {
      // Errou
      newLinha = linhaAtual + 1;
    }
    else {
      // Perdeu
      newLinha = - 1;
    }
    this.setState({ linhaAtual: newLinha, classes, palavrasUsadas, complete: comp }, () => {
      callback();
    });
  }

  render() {
    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key':'ArrowRight'
    }));
    const { qtd } = this.props;
    const { linhaAtual, classes, palavrasUsadas, complete } = this.state;
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
          complete={ complete }
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
    return (
      <div className='conjunto'>
        { tentativas.map((item) => item) }
      </div>
    )
  }
}

export default Conjunto;
