import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import SingleApp from './components/SingleApp';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class HomePage extends React.Component {

  componentDidMount() {
    if (window.socket) {
      window.socket.disconnect();
    }
  }

  render() {
    return (
      <div className="home">
        <h1 style={{ textAlign: 'center' }}>Welcome to Gomoku!</h1>
        <h2>Here you have two choices:</h2>
        <h2>
          1. Single player mode, which means one/two people playing on the same
          computer using one browser and no data is persisted on closing of browser
        </h2>
        <Link to='/singleMode'>Click Here</Link>
        <h2>
          2. Online mode, which means two people playing concurrently together on
          different browsers and data is persisted (wins and board state)
        </h2>
        <Link to='/onlineMode'>Click Here</Link>
      </div>
    );
  }
};

const routing = (
  <Router>
    <div className="routing">
      <Route exact path='/' component={HomePage} />
      <Route path='/singleMode' component={SingleApp}/>
      <Route path='/onlineMode' component={App}/>
    </div>
  </Router>
)

render(routing, document.getElementById('app'));
