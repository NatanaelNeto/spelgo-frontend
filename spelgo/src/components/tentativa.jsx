import React from "react";
import Letter from "./letter";

class Tentativa extends React.Component {
  constructor() {
    super();
    this.state = {
      tentativa: [],
      seletor: 0,
      currWord:'',
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount () {
    document.addEventListener("keydown", this.handleSelect);
    this.handleUpdate();
  }

  handleUpdate () {
    const { palavra, linha, linhaAtual } = this.props;
    const { seletor } = this.state;
    const tentativa = [];
    let currClass = linha > linhaAtual && "untouched";

    for (let i = 0; i < 5; i += 1) {
      tentativa.push(<Letter index={i} key={i} currClass={ `${(linha === linhaAtual && i === seletor) && "select"} ${currClass}`} currLetter={ linha <= linhaAtual ? palavra[i] : '' } />)
    }
    this.setState({ tentativa });
  }

  handleSelect (event) {
    const { seletor } = this.state;
    let novoSeletor = -1;
    event.preventDefault();
    if (event.keyCode === 39 && (seletor + 1 <= 4)) {
      novoSeletor = seletor + 1;
    }
    else if (event.keyCode === 37 && seletor - 1 >= 0) {
      novoSeletor = seletor - 1;
    }
    else if (event.keyCode >= 65 && event.keyCode <= 90) {
      
    }
    if (novoSeletor >= 0) this.setState({ seletor: novoSeletor }, () => { this.handleUpdate() });
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
