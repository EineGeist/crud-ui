import React, { Component } from 'react';
import Table from '../Table/Table.js';
import AddRecord from "../AddRecord/AddRecord.js";
import '../tableStyles.css';

import requests from "../../requests.js";


class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: null,
      actionsAmount: 2,
    }
  }

  componentDidMount = () => {
    this.loadRecords();
  };

  loadRecords = () => {
    requests
      .GET_RECORDS()
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error(`Table loading failed: ${response.status} (${response.statusText})`);
      })
      .then(this.unpackRecords)
      .catch(error => {throw error});
  };

  unpackRecords = result => {
    let records = this.processRecords(result);

    const columnLabels = this.getColumnLabels(records);

    records = records.map(record => {
      const data = record.data;

      columnLabels.forEach(label => {
        if (data[label] === undefined) data[label] = null;
      });

      return record;
    });

    this.setState({
      records: records,
      columnLabels: columnLabels
        .concat(this.getActionLabels()),
    });
  };

  validateData = data => {
    if (!data // checks if data is null
      || typeof data !== 'object'
      || Array.isArray(data)) return false;

    return !Object.keys(data).find(
      key => key === '0'
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
    return records.reduce((processed, record) => {
      if (!record._id
        || !this.validateData(record.data)) return processed;

      processed.push(
        this.filterRecord(
          Object.entries(record)
        )
      );

      return processed;
    }, []);
  };

  getColumnLabels = records => {
    const labels = new Set();

    records.forEach(record => {
      const keys = Object.keys(record.data);

      for (let key of keys) {
        labels.add(key);
      }
    });

    return Array(...labels);
  };

  getActionLabels = () => {
    return Array(this.state.actionsAmount).fill(null)
  };


  addRecord = data => {
    requests
      .ADD_RECORD({data: data})
      .then(response => {
        if (response.ok) this.loadRecords();
        else throw new Error(`Table add record failed: ${response.status} (${response.statusText})`);
      })
      .catch(error => {throw error});
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
      })
      .catch(error => {throw error});
  };


  renderAddRecord = () => {
    const { columnLabels, records, actionsAmount } = this.state;

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
    if (!this.state.records) return null;
    const { records, columnLabels } = this.state;

    return (
      <div className={'table-container'}>
        <Table
          columnLabels={columnLabels}
          records={records}
          deleteHandler={this.deleteRecord}
        />

        <div className={'add-record'}>
          {this.renderAddRecord()}
        </div>
      </div>
    )
  }
}

export default TableContainer;