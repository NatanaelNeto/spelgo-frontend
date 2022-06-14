import React from "react";
import Header from '../components/header';

class Game extends React.Component {
  render() {
    const { location } = this.props;
    const active = location.pathname.slice(1,5);
    return (
      <div>
        <Header active = {active} />
      </div>
    )
  }
}

export default Game;
