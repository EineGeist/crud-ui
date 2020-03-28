import React, { Component } from 'react';
import Table from './table.js';
import AddRecord from "./addRecord.js";

import requests from "./requests.js";


class TableContainer extends Component {
  componentDidMount = () => {
    this.loadRecords();
  };

  loadRecords = () => {
    requests
      .GET_RECORDS()
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error(`Table loading failed: ${response.status} (${response.statusText})`);
      }).then(this.unpackRecords)
      .catch(error => {throw error});
  };

  unpackRecords = result => {
    let records = this.processRecords(result);

    records.data = records.map(
      record => this.addActions(record.data)
    );

    this.setColumnLabels(records);

    this.setState({
      records: records,
    });
  };

  validateData = data => {
    if (!data) return false;

    return !Object.keys(data).find(
      key => {
        return key === '0';
      }
    );
  };

  filterRecord = record => {
    return Object.fromEntries(
      record.filter(
        prop => !(prop[0].slice(0, 2) === '__')
      )
    );
  };

  processRecords = records => {
    return records.reduce((filtered, record) => {
      if (!this.validateData(record.data)) return filtered;

      filtered.push(
        this.filterRecord(
          Object.entries(record)
        )
      );

      return filtered;
    }, []);
  };

  setColumnLabels = records => {
    const data = records[0].data;

    this.columnLabels = Object.keys(data);
  };

  addActions = data => {
    const actions = [
      {'': <span className={'table__delete icon'}>&#xe9ad;</span>}
    ];
    this.actionsAmount = actions.length;

    return Object.assign(data, ...actions);
  };


  addRecord = data => {
    requests
      .ADD_RECORD({data: data})
      .then(response => {
        if (response.ok) this.loadRecords();
        else throw new Error(`Table add record failed: ${response.status} (${response.statusText})`);
      }).catch(error => {throw error});
  };

  deleteRecord = id => {
    requests
      .DELETE_RECORD(id)
      .then(response => {
        if (response.ok) {
          const records = this.state.records.slice()
            .filter(record => String(record._id) !== id);

          this.setState({
            records: records,
          });
        } else throw new Error(`Table delete record failed: ${response.status} (${response.statusText})`);
      }).catch(error => {throw error});
  };

  handleDelete = ({ target }) => {
    if (!target.closest('.table__delete')) return;

    const tableRow = target.closest('.table__row');
    if (!tableRow) return;

    this.deleteRecord(tableRow.dataset.key);
  };


  renderAddRecord = () => {
    const { columnLabels, actionsAmount } = this;
    const { records } = this.state;

    // weeds actions off
    const filedNames = columnLabels
      .slice(0, columnLabels.length - actionsAmount);

    return <AddRecord
      id={records.length}
      fieldNames={filedNames}
      addHandler={this.addRecord}
    />
  };

  render() {
    if (!this.state) return null;

    const { records } = this.state;

    return (
      <div className={'table-container'} onClick={this.handleDelete}>
        <Table
          columnLabels={this.columnLabels}
          records={records}
        />

        <div className={'add-record'}>
          {this.renderAddRecord()}
        </div>
      </div>
    )
  }
}

export default TableContainer;