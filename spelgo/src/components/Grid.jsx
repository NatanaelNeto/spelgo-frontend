import React from "react";
import GridLetter from "./gridLetter";

class Grid extends React.Component {
  render () {
    const { classes } = this.props;
    const letters = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','ç','z','x','c','v','b','n','m'];
    return (
      <div className="game-grid-content">
        { letters.map ((l, index) => <GridLetter letter={l} classes={classes[index]}  /> ) }
      </div>
    );
  }
}

export default Grid;
