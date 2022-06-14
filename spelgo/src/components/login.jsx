import React from "react";

class Login extends React.Component {

  render() {
    const { handleClick, buttonClick } = this.props;
    return (
      <div className="login">
        <h3>Login</h3>
        <form>
          <input id="nome" type="text" onChange={ handleClick } />
          <input id="senha" type="password" onChange={ handleClick } />
          <button onClick={ buttonClick }>Entrar</button>
        </form>
      </div>
    )
  }
}

export default Login;
