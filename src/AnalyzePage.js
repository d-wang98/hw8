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
import ChartComponent from "./ChartComponent";
import ReactDOM from "react-dom";
import Slider from "@material-ui/core/Slider";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "@material-ui/core";

class AnalyzePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estimate: 56,
      showGrid: true,
      companyValue: 0,
      marketValue: 0,
      industryValue: 0,
      estimateValue: 56,
      dataSet: false
    };
  }

  updateTicker = e => {
    this.setState({ ticker: e });
  };

  handleChangeEstimate = () => {
    const val =
      this.state.estimateValue +
      (this.state.estimateValue / 50) *
        (this.state.companyValue / 2 +
          this.state.marketValue / 8 +
          this.state.industryValue / 5);
    console.log("HIIII set" + val);
    this.setState({ estimate: val });
  };
  handleChangeComp = (event, newValue) => {
    this.setState({ companyValue: newValue });
    this.handleChangeEstimate();
  };

  handleChangeIndustry = (event, newValue) => {
    this.setState({ industryValue: newValue });
    this.handleChangeEstimate();
  };

  handleChangeMarket = (event, newValue) => {
    this.setState({ marketValue: newValue });
    this.handleChangeEstimate();
  };

  handleData = d => {
    if (!this.state.dataSet) {
      let i;
      let sum = 0;
      for (i = d.length - 100; i < d.length; i++) {
        sum = sum + d[i].open;
      }
      this.setState({
        estimate: sum / 100,
        estimateValue: sum / 100,
        dataSet: true
      });
    }
  };
  render() {
    //pre-rendering code
    const marks = [
      {
        value: -5,
        label: "Bearish"
      },
      {
        value: 5,
        label: "Bullish"
      }
    ];

    return (
      <div>
        <div class="ticker-title">{this.props.ticker}</div>
        <div class="graph-page">
          <div class="slide-bar-a">
            <div>
              1. How Do You See <span>{this.props.ticker}</span> Long Term?
              <Slider
                defaultValue={0}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                marks={marks}
                min={-5}
                max={5}
                valueLabelDisplay="auto"
                track={false}
                onChangeCommitted={this.handleChangeComp}
              />
            </div>
            <div>
              2. How Do You See the <span>{this.props.ticker}</span> Market Long
              Term?
              <Slider
                defaultValue={0}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                marks={marks}
                min={-5}
                max={5}
                valueLabelDisplay="auto"
                track={false}
                onChangeCommitted={this.handleChangeIndustry}
              />
            </div>
            <div>
              3. How Do You see the Stock Market Long Term?
              <Slider
                defaultValue={0}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                marks={marks}
                min={-5}
                max={5}
                valueLabelDisplay="auto"
                track={false}
                onChangeCommitted={this.handleChangeMarket}
              />
            </div>
          </div>
          <div>
            <ChartComponent
              estimate={this.state.estimate}
              showGrid={this.state.showGrid}
              ticker={this.state.ticker}
              handleData={this.handleData}
            ></ChartComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzePage;
