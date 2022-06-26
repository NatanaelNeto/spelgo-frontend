import React from "react";
import AddWords from "../components/addWords";
import Login from "../components/login";
import Words from "../components/words";
import '../style/Dashboard.css';

class Dashboard extends React.Component {
  constructor () {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.updateState = this.updateState.bind(this);
    this.fetchWords = this.fetchWords.bind(this);

    this.state = {
      nome: '',
      senha: '',
      token: '',
      logged: false,
      message: '',
      words: [],
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  componentDidMount() {
    this.fetchWords();
  }

  async updateState() {
    await this.fetchWords();
  }

  async fetchWords() {
    const payload = {
      method: 'GET',
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    };
    const data = await fetch('https://termo-crente.herokuapp.com/words', payload)
      .then(response => response.json());
    const { words } = data;
    this.setState({ words });
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

  async handleDelete(event) {
    const { token } = this.state;
    event.preventDefault();
    const payload = {
      method: 'DELETE',
      body: JSON.stringify({ }),
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "authentication": token }
    };
    const data = await fetch(`https://termo-crente.kerokuapp.com/words/${event.target.name}`, payload)
      .then(response => response.json());
    console.log(data);
    this.fetchWords();
  }

  render() {
    const { token, logged, message, words } = this.state;
    return logged ? (
      <div className="container column-type">
        <Words words={ words } handleDelete={ this.handleDelete } />
        <AddWords token={ token } updateState={ this.updateState } />
      </div>
    )
    : (
      <div className="container">
        <Login handleClick={ this.handleChange } buttonClick={ this.handleLogin } message={ message } />
      </div>
    )
  }
}

export default Dashboard;
