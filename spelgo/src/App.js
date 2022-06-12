import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './pages/Game';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Game} />
        <Route exact path="/uno" component={Game} />
        <Route exact path="/duo" component={Game} />
        <Route exact path="/trio" component={Game} />
        <Route exact path="/pool" component={Game} />
      </div>
    </BrowserRouter>
  );
}

export default App;
