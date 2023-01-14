import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Song from './components/song';
import Add from './components/add';
import List from './components/list';

function App() {
  return (
    <div className="App">
      <div className="bg-secondary" style={{ height: "80px" }}>
        <h1 className="position-relative top-50 start-0 translate-middle-y ms-5 fw-bold">
          Mini Project
        </h1>
      </div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Add/>
            <Song/>
          </Route>
          <Route path="/list">
            <List/>
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
