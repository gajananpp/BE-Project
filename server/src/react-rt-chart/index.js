'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _c = require('c3');

var _c2 = _interopRequireDefault(_c);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _loadHistoricalData = require('./loadHistoricalData');

var _loadHistoricalData2 = _interopRequireDefault(_loadHistoricalData);

var _filterReactDomProps = require('filter-react-dom-props');

var _filterReactDomProps2 = _interopRequireDefault(_filterReactDomProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDate = function isDate(key) {
  return key === "date";
};
var isList = function isList(data) {
  return data && data.length;
};
var emptyList = function emptyList(list) {
  return !isList(list) || list.length == 0;
};
var hasDataProperty = function hasDataProperty(data) {
  return data.hasOwnProperty('date');
};

var updateHistoricalData = function updateHistoricalData(props, nextProps) {
  var lastData = props.initialData;
  var nextData = nextProps.initialData;

  if (!lastData && !nextData) return false;

  if (emptyList(nextData)) return false;

  if (emptyList(lastData) && !emptyList(nextData)) {
    return true;
  }

  return nextData.length != lastData.length;
};

var RTChart = _react2.default.createClass({
  displayName: 'RTChart',

  componentDidMount: function componentDidMount() {
    var _props = this.props;
    var initialData = _props.initialData;
    var maxValues = _props.maxValues;

    this.limit = maxValues || 30;
    this.count = isList(initialData) ? initialData.length : 0;

    this.initChart(this.props);
  },

  getInitialState: function getInitialState() {
    return {
      chart: null
    };
  },

  unload: function unload() {
    this.state.chart.unload({
      ids: this.props.fields
    });
  },

  resetChart: function resetChart() {
    this.unload();
    this.initChart(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

    if (updateHistoricalData(this.props, nextProps)) {
      this.initChart(nextProps);
      return;
    }

    if (!this.state.chart) return;
    if (!nextProps.data) return;

    if (Object.keys(nextProps.data).length < this.props.fields.length) {
      console.warn('Values has a length of ' + nextProps.values.length + ' but must be the same as fields: ' + this.props.fields.length);
    }

    if (nextProps.reset) {
      this.resetChart(nextProps);
    }

    var columns = (0, _loadHistoricalData2.default)([nextProps.data], nextProps.fields, this.limit);

    var args = (0, _deepmerge2.default)({
      columns: columns,
      duration: 400
    }, this.props.flow || {});

    if (this.count <= this.limit) this.count++;

    if (this.count < this.limit) args['length'] = 0;

    this.state.chart.flow(args);
  },

  render: function render() {
    return _react2.default.createElement('div', _extends({}, (0, _filterReactDomProps2.default)(this.props), { ref: 'chart' }));
  },

  initChart: function initChart(props) {
    if (!props.fields) {
      throw new Error("prop type fields are missing. fields={['field',..]}");
    }

    if (this.state.chart) {
      this.unload();
    }

    var initialData = props.initialData;
    var chart = props.chart;
    var fields = props.fields;

    var defaultColumns = [['x']];

    props.fields.forEach(function (f) {
      return defaultColumns.push([f]);
    });

    var chart_temp = (0, _deepmerge2.default)({
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%H:%M:%S'
          }
        }
      }
    }, chart || {});

    var columns = !emptyList(initialData) ? (0, _loadHistoricalData2.default)(initialData, fields, this.limit) : defaultColumns;
    var chart_temp = (0, _deepmerge2.default)({
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%H:%M:%S'
          }
        }
      },
      data: {
        x: 'x',
        columns: columns,
        type: 'area',
      },
      grid: {
        x: {
          show: true
        },
        y: {
          show: true
        }
      },
      padding: {
        right: 25
      },
      tooltip: {
        show: true
      }
    }, chart || {});

    chart_temp.bindto = this.refs.chart;

    var chart = _c2.default.generate(chart_temp);

    this.setState({
      chart: chart,
      initialData: initialData
    });
  },

  propTypes: {
    dateFormat: _react2.default.PropTypes.string,
    chart: _react2.default.PropTypes.object,
    fields: _react2.default.PropTypes.array.isRequired,
    maxValues: _react2.default.PropTypes.number
  }
});

module.exports = RTChart;