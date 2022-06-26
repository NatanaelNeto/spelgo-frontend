import './style/App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './pages/Game';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Game} />
        <Route exact path="/uno" component={Game} />
        <Route exact path="/duo" component={Game} />
        <Route exact path="/trio" component={Game} />
        <Route exact path="/pool" component={Game} />
        <Route exact path="/dash" component={Dashboard} />
      </div>
    </BrowserRouter>
  );
}

export default App;
