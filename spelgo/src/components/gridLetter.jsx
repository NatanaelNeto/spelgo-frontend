import React from "react";

class GridLetter extends React.Component {
  render () {
    const { letter, classes } = this.props;
    return (
      <div className='grid-letter'>
        {/* style={{background: `conic-gradient( ${classes[0] && classes[0]} 90deg, ${classes[1] && classes[1]} 90deg 180deg, ${classes[2] && classes[2]} 180deg 270deg, ${classes[3] && classes[3]} 270deg)`}}  */}
        <div>{ letter }</div>
      </div>
    );
  }
}

export default GridLetter;
