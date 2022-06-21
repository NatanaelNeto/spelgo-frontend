import React from "react";
import Login from "../components/login";

class Dashboard extends React.Component {
  constructor () {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      nome: '',
      senha: '',
      token: '',
      logged: false,
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleLogin(event) {
    event.preventDefault();
    const { nome, senha } = this.state;
    const data = {
      method: 'POST',
      body: JSON.stringify({ nome, senha }),
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    };
    const response = await fetch('https://termo-crente.herokuapp.com/login', data);
    const { token } = await response.json();
    this.setState({ token });
  }

  // componentDidMount() {
  //   const acessToken = localStorage.getItem('token');
  //   this.setState({
  //     token: acessToken || '',
  //     logged: !!acessToken,
  //   })
  // }

  render() {
    const { token } = this.state;
    return token.length > 0 ? (
      <div>
        {token}
      </div>
    )
    : (
      <div className="container">
        <Login handleClick={this.handleChange} buttonClick={this.handleLogin}/>
      </div>
    )
  }
}

export default Dashboard;
