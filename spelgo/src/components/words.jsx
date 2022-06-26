import React from 'react';
import Palavra from './palavra';

class Words extends React.Component {

  render() {
    const { words, handleDelete } = this.props;
    return (
      <div className='block-container lista'>
        <h3>Palavras cadastradas: {words.length}</h3>
        <ul className='palavras'>
          { words.map((item) => <Palavra key={ item } palavra={ item } handleDelete={ handleDelete } />)}
        </ul>
      </div>
    )
  }
}

export default Words;
