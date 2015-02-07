var React = require('react');
var EventStore = require('../stores/query_store.js');
var dsv = require('dsv');
var saveAs = require('filesaver.js');

var ExportTable = React.createClass({
  exportCSV() {
    saveAs(new Blob([dsv.csv.format(EventStore.all())], {type: "text/plain;charset=utf-8"}), 'results.csv');
  },
  exportJSON() {
    saveAs(new Blob([EventStore.all()], {type: "text/plain;charset=utf-8"}), 'results.json');
  },
  render() {
    return (
      <div>
        <span className='icon share'></span>
        <a
          onClick={this.exportCSV}
          className='pad2x'>CSV</a>
        <a
          onClick={this.exportJSON}
          className=''>JSON</a>
      </div>);
  }
});

module.exports = ExportTable;
