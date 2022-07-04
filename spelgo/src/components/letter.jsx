import React from "react";

class Letter extends React.Component {
  render() {
    const { currClass, currLetter } = this.props;
    return (
      <div className={ `letter ${currClass}` }>{ currLetter }</div>
    )
  }
}

export default Letter;