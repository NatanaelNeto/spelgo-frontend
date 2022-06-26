import React from 'react';

class Palavra extends React.Component {
  render() {
    const { palavra, handleDelete } = this.props;
    return (
      <li className='palavra'>
        <p>{ palavra }</p>
        {/* <button name={ palavra } onClick={ handleDelete } >X</button> */}
      </li>
    )
  }
}

export default Palavra;