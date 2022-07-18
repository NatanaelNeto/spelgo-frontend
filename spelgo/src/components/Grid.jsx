import React from "react";
import GridLetter from "./gridLetter";

class Grid extends React.Component {
  render () {
    const { classes } = this.props;
    const letters = ['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return (
      <div className={ ...classes }>
        { letters.map ((l, index) => <GridLetter letter={l} classes={classes[index]}  /> ) }
      </div>
    );
  }
}

export default Grid;
