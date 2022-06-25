import React from "react";
import Login from "../components/login";
import Words from "../components/words";

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
      message: '',
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleLogin(event) {
    event.preventDefault();
    this.setState({ message: 'Carregando...' });
    const { nome, senha } = this.state;

    if (senha.length < 5) {
      this.setState({message: 'Dados inválidos'});
      return;
    }
    const payload = {
      method: 'POST',
      body: JSON.stringify({ nome, senha }),
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    };
    const response = await fetch('https://termo-crente.herokuapp.com/login', payload);
    const apiInfo = await response.json();
    if (apiInfo.error) {
      console.error(apiInfo);
      this.setState({message: 'Dados inválidos'});
      return;
    }
    this.setState({ token: apiInfo.token, logged: true, message:'' });
  }

  // componentDidMount() {
  //   const acessToken = localStorage.getItem('token');
  //   this.setState({
  //     token: acessToken || '',
  //     logged: !!acessToken,
  //   })
  // }

  render() {
    const { token, logged, message } = this.state;
    return logged ? (
      <div className="container">
        <Words token={token} />
      </div>
    )
    : (
      <div className="container">
        <Login handleClick={this.handleChange} buttonClick={this.handleLogin} message={message} />
      </div>
    )
  }
}

export default Dashboard;
