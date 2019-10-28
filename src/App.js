import React from 'react';
import Home from './containers/Home';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MyPortfolio from './containers/MyPortfolio';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/portfolio" component={MyPortfolio}/>
        <Route path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
