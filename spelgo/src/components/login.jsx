import React from "react";
import '../style/Login.css'

class Login extends React.Component {

  render() {
    const { handleClick, buttonClick, message } = this.props;
    return (
      <div className="login">
        <h3>Login</h3>
        <form className="login-form">
          <input id="nome" type="text" onChange={ handleClick } />
          <input id="senha" type="password" onChange={ handleClick } required />
          <button onClick={ buttonClick }>Entrar</button>
          { message.length > 1 && <span>{ message }</span> }
        </form>
      </div>
    )
  }
}

export default Login;
