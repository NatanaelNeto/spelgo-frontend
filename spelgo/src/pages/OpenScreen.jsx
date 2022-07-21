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
          <p>Seu objetivo é descobrir <span>(e não adivinhar. Dt 18: 10,12)</span> qual palavra está escondida no jogo <span>(se conseguir. Lc 8:17)</span>. Todo dia, são sorteadas novas palavras <span>(sem fazer uso do Urim e Tumim)</span>.</p>
          <p>Para isso, digite uma palavra relacionada à Bíblia que tenha 5 letras como, por exemplo, JOSUÉ:</p>
          <p className="open-word"><div className="correct letter">J</div><div className="letter">O</div><div className="correct letter">S</div><div className="correct letter">U</div><div className="wrong-position letter">É</div></p>
          <p>Caso a letra esteja correta e na posição certa, ela ficará <span className="letter green">verde</span>. Porém, se ela está correta, mas na posição errada, ela ficará <span className="letter yellow">amarela</span>. Caso ela não exista na palavra, ela simplesmente não ficará colorida.</p>
          <p>Com base nisso, a palavra acima é:</p>
          <p className="open-word"><div className="correct letter">J</div><div className="correct letter">E</div><div className="correct letter">S</div><div className="correct letter">U</div><div className="correct letter">S</div></p>
        </div>
        <span>spelgo v0.1 - Natanael Neto</span>
      </div>
    );
  }
}

export default OpenScreen;
