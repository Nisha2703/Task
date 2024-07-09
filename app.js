import React from'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './register';
import Login from './login';
import CreateQuiz from './createquiz';
import TakeQuiz from './takequiz';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/create-quiz" component={CreateQuiz} />
          <Route path="/take-quiz" component={TakeQuiz} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
