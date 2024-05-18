import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Eco-Friendly Transportation Tracker</h1>
        
        <nav>
          <ul>
            <li><a href='/login'>Login</a></li>
            <li><a href='/'>Signup</a></li>
            <li><a href='/dashboard'>Dashboard</a></li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
