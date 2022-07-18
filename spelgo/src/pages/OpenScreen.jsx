import React from "react";
import '../style/OpenScreen.css';

class OpenScreen extends React.Component {
  render() {
    return (
      <div className="open-screen">
        <div className="title">
          <h2>spelGo</h2>
          <p>O primeiro wordle crente em português!</p>
        </div>
        <div>
          <h3>Como Funciona?</h3>
          <p>Digite uma palavra relacionada à Bíblia que tenha 5 letras.</p>
        </div>
      </div>
    );
  }
}

export default OpenScreen;
