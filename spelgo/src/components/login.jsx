import React from "react";

class Login extends React.Component {
  constructor () {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      nome: '',
      senha: '',
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <div className="login">
        <h3>Login</h3>
        <form>
          <input id="nome" type="text" onChange={this.handleChange} />
          <input id="senha" type="password" onChange={this.handleChange} />
        </form>
      </div>
    )
  }
}

export default Login;
