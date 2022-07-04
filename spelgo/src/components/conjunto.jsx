import React from "react";
import Tentativa from "./tentativa";

class Conjunto extends React.Component {
  render() {
    const { qtd } = this.props;
    const tentativas = [];
    for (let i = 0; i < qtd; i += 1) {
      tentativas.push(<Tentativa linha={ i + 1 } />);
    }
    return (
      <div>
        { tentativas.map((item) => item) }
      </div>
    )
  }
}

export default Conjunto;
