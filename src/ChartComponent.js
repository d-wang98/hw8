// from example
import React from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import { getData } from "./utils";

import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
  componentDidMount() {
    getData().then(data => {
      this.setState({ data });
    });
  }

  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    } else {
      this.props.handleData(this.state.data);
    }
    return (
      <TypeChooser>
        {type => (
          <Chart
            type={type}
            data={this.state.data}
            estimate={this.props.estimate}
            showGrid={this.props.showGrid}
            ticker={this.props.ticker}
          />
        )}
      </TypeChooser>
    );
  }
}

export default ChartComponent;
