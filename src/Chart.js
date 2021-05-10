// partly from example
import React from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries, StraightLine } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { EdgeIndicator } from "react-stockcharts/lib/coordinates";
class CandleStickChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const height = window.innerHeight;
    const width = window.innerWidth / 2; // TODO: GOTTA CHANGE
    const { type, data, ratio, estimate, showGrid } = this.props;
    const margin = { left: 70, right: 70, top: 20, bottom: 30 };

    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right;

    const xAccessor = d => d.date;

    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - 100])
    ];

    const yGrid = showGrid
      ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.1 }
      : {};
    const xGrid = showGrid
      ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.1 }
      : {};

    return (
      <ChartCanvas
        height={400}
        ratio={ratio}
        width={width}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={d => [d.high, d.low]}>
          
          <XAxis axisAt="bottom" orient="bottom" ticks={5} {...xGrid} />
          <YAxis axisAt="left" orient="left" ticks={5} {...yGrid} />
          <StraightLine
            type="horizontal"
            yValue={() => this.props.estimate}
            strokeDasharray="LongDash"
          />
          <EdgeIndicator
            itemType="first"
            orient="right"
            edgeAt="right"
            yAccessor={() => this.props.estimate}
            fill={"#6BA583"}
          />

          <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
        </Chart>
      </ChartCanvas>
    );
  }
}

CandleStickChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

CandleStickChart.defaultProps = {
  type: "svg"
};
CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;
