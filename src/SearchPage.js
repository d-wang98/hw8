import React from "react";
// import "../assets/css/App.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchBar from "./SearchBar";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: [
        "AAPL",
        "MSFT",
        "FB",
        "GOOGL",
        "TSLA",
        "BABA",
        "JPM",
        "PG",
        "NVDA",
        "VZ",
        "ADBE",
        "CREE",
        "AMD",
        "NIO",
        "HPQ",
        "DELL"
      ],
      // searchListAlpha: {
      //   "AAPL":"Apple Inc.",
      //   "MSFT":"Microsoft Corporation",
      //   "FB":"Facebook, Inc.",
      //   "GOOGL":"Alphabet Inc.",
      //   "TSLA":"Tesla, Inc.",
      //   "BABA":"Alibaba Group Holding Ltd",
      //   "JPM":"JPMorgan Chase & Co.",
      //   "PG":"Procter & Gamble Co",
      //   "NVDA":"NVIDIA Corporation",
      //   "VZ":"Verizon Communications Inc.",
      //   "ADBE":"Adobe Inc."
      // },
     
      shouldRender: [
        "AAPL",
        "MSFT",
        "FB",
        "GOOGL",
        "TSLA",
        "BABA",
        "JPM",
        "PG",
        "NVDA",
        "VZ",
        "ADBE",
        "CREE",
        "AMD",
        "NIO",
        "HPQ",
        "DELL"
      ]
    };
  }

  filterFunction = userInput => {
    let filteredNames = this.state.searchList.map(x => {
      return x.includes(userInput);
    });

    let tempList = [];

    for (var i = 0; i < this.state.searchList.length; i++) {
      if (filteredNames[i]) {
        tempList.push(this.state.searchList[i]);
      }
    }
    this.setState({ shouldRender: tempList });
  };

  render() {
    //pre-rendering code

    return (
      <Row>
        <SearchBar filterFunction={this.filterFunction} />
        <ul>
          {this.state.shouldRender.map(ticker => (
            <Link to="analyze">
              <Button onClick={() => this.props.updateTicker(ticker)}>
                {ticker}
              </Button>
            </Link>
          ))}
        </ul>
      </Row>
    );
  }
}

export default SearchPage;
