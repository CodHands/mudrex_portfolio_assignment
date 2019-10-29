import React from 'react';
import Home from './containers/Home';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MyPortfolio from './containers/MyPortfolio';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

function App() {
  const theme = createMuiTheme({
      typography: {
          fontFamily: 'Barlow'
        }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/portfolio" component={MyPortfolio}/>
          <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
