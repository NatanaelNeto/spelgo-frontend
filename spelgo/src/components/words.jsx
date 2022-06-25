import React from 'react';

class Words extends React.Component {

  render() {
    const { words } = this.props;
    return (
      <div className='block-container lista'>
        <h3>Palavras cadastradas</h3>
        <ul>
          { words.map((item) => <li key={item}>{ item }</li>)}
        </ul>
      </div>
    )
  }
}

export default Words;
