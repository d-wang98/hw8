import logo from "./logo.svg";
import "./App.css";
import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import SearchPage from "./SearchPage";
import AnalyzePage from "./AnalyzePage";
import { AnimatedSwitch } from "react-router-transition";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ticker: "MSFT" };
  }

  updateTicker = e => {
    this.setState({ ticker: e });
  };

  render() {
    //pre-rendering code

    return (
      <Router>
        <Route path="/">
          <SearchPage updateTicker={this.updateTicker}></SearchPage>
        </Route>
        <Route path="/analyze">
          <AnalyzePage ticker={this.state.ticker}></AnalyzePage>
        </Route>
      </Router>

    );
  }
}

export default App;
