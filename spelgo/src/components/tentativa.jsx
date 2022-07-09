import React from "react";
import Letter from "./letter";

class Tentativa extends React.Component {
  constructor() {
    super();
    this.state = {
      tentativa: [],
      seletor: 0,
      currWord:['', '', '', '', ''],
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount () {
    document.addEventListener("keydown", this.handleSelect);
    this.setState({ currWord: ['', '', '', '', ''] }, this.handleUpdate);
  }

  handleUpdate () {
    console.log('update');
    const { palavra, linha, linhaAtual, classes } = this.props;
    const { seletor, currWord } = this.state;
    const tentativa = [];
    let currClass = linha > linhaAtual && "untouched";
    const testeCorrect = classes.every((classe) => classe === 'correct');
    if(testeCorrect) currClass = '';
    console.log(classes);

    for (let i = 0; i < 5; i += 1) {
      tentativa.push(<Letter index={i} key={i} currClass={ `${(linha === linhaAtual && i === seletor) && "select"} ${currClass} ${classes ? classes[i] : ''}`} currLetter={ linha === linhaAtual ? currWord[i] : palavra[i] } />)
    }
    this.setState({ tentativa });
  }

  handleSelect (event) {
    const { linha, linhaAtual } = this.props;

    if (linha === linhaAtual) {
      const { seletor, currWord } = this.state;
      let novoSeletor = -1;
      let isArrow = false;
      event.preventDefault();
      if (event.keyCode === 39 && (seletor + 1 <= 4)) {
        novoSeletor = seletor + 1;
        isArrow = true;
      }
      else if (event.keyCode === 37 && seletor - 1 >= 0) {
        novoSeletor = seletor - 1;
        isArrow = true;
      }
      else if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode === 186) {
        currWord[seletor] = event.key;
        novoSeletor = seletor < 4 && !isArrow ? seletor + 1 : seletor;
        this.setState({ currWord, seletor: novoSeletor }, () => { this.handleUpdate() });
        return;
      }
      else if (event.keyCode === 8) {
        currWord[seletor] = '';
        novoSeletor = seletor > 0 && !isArrow ? seletor - 1 : seletor;
        this.setState({ currWord, seletor: novoSeletor }, () => { this.handleUpdate() });
        return;
      }
      else if (event.keyCode === 13 && linha === linhaAtual) {
        for (let i = 0; i < currWord.length; i += 1) {
          if (currWord[i] === '') return;
        }
        const { onEnterPressed } = this.props;
        console.log("Chamada a função", currWord);
        this.setState({ seletor: 0 }, () => onEnterPressed(currWord.join(''), this.handleUpdate));
        return;
      }
      if (novoSeletor >= 0) {
        this.setState({ seletor: novoSeletor }, () => { this.handleUpdate() });
        return;
      }
    }
  }

  render () {
    const { linha } = this.props;
    const { tentativa } = this.state;
    return (
      <ul className={ `tentativa ${linha}` }>
        { tentativa.map((item) => <li>{ item }</li>) }
      </ul>
    )
  }
}

export default Tentativa;
