import React, { Component } from 'react';
import Table from './table.js';
import AddRecord from "./addRecord";
import RecordActions from "./recordActions.js";

class TableContainer extends Component {
  constructor(props) {
    super(props);

    const data = props.data.map(
      record => this.addActions(record)
    );

    this.state = {
      data: data,
    };

    this.setColumnNames();
  }

  addActions = (record) => {
    return Object.assign(record,         {'actions': <RecordActions/>});
  };

  setColumnNames = () => {
    const data = this.state.data[0];

    this.columnNames = Object.keys(data);
  };

  renderAddRecord = () => {
    const { data } = this.state;

    return <AddRecord
      id={data.length}
      labels={this.columnNames}
      addHandler={this.addRecord}
    />
  };

  addRecord = record => {
    const data = this.state.data.slice();
    record = this.addActions(record);

    this.setState({
      data: data.concat(record),
    });
  };

  deleteRecord = key => {
    key = String(key);

    const data = this.state.data.slice()
      .filter(record => String(record.id) !== key);

    this.setState({
      data: data,
    });
  };

  handleDelete = ({ target }) => {
    if (!target.closest('.table__delete')) return;

    const tableRow = target.closest('.table__row');
    if (!tableRow) return;

    this.deleteRecord(tableRow.dataset.key);
  };

  render() {
    const { data } = this.state;

    return (
      <div className={'table-container'} onClick={this.handleDelete}>
        <Table
          data={data}
          columnNames={this.columnNames}
        />
        <div className={'add-record'}>
          {this.renderAddRecord()}
        </div>
      </div>
    )
  }
}

export default TableContainer;