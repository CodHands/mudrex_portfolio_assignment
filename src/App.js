import React from 'react';
import Home from './containers/Home';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}/>
      </Switch>
      <Alert stack={{limit: 3}} />
    </BrowserRouter>
  );
}

export default App;
