import React from "react";

class GridLetter extends React.Component {
  render () {
    const { letter, classes } = this.props;
    return (
      <div className={ ...classes }>
        { letter }
      </div>
    );
  }
}

export default GridLetter;
