import React from "react";
import Letter from "./letter";

class Tentativa extends React.Component {
  render () {
    const { linha } = this.props;
    const tentativa = [];
    for (let i = 0; i < 5; i += 1) {
      tentativa.push(<Letter currClass="" currLetter="A" />)
    }
    return (
      <ul className={ `tentativa ${linha}` }>
        { tentativa.map((item) => <li>{ item }</li>) }
      </ul>
    )
  }
}

export default Tentativa;
