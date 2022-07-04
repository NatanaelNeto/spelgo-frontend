import './style/App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './pages/Game';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Game} />
        <Route exact path="/uno" render={ () => <Game active="uno" quantity="1" />} />
        <Route exact path="/duo" render={ () => <Game active="duo" quantity="2" />} />
        <Route exact path="/trio" render={ () => <Game active="trio" quantity="3" />} />
        <Route exact path="/pool" render={ () => <Game active="pool" quantity="4" />} />
        <Route exact path="/dash" component={Dashboard} />
      </div>
    </BrowserRouter>
  );
}

export default App;
