import React from "react";

class Letter extends React.Component {
  render() {
    const { currClass, currLetter, index } = this.props;
    return (
      <div name={ index } className={ `letter ${currClass}` }>{ currLetter }</div>
    )
  }
}

export default Letter;