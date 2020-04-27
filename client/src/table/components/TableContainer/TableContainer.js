import React, { Component } from 'react';
import Table from '../Table/Table.js';
import AddRecord from '../AddRecord/AddRecord.js';
import './styles.css';

import {
  getRecords,
  addRecord,
  deleteRecord,
} from '../../requests.js';

class TableContainer extends Component {
  state = {
    records: null,
  };

  ACTIONS_AMOUNT = 2;

  componentDidMount = async () => {
    const [records, fields] = await getRecords();
    const columnLabels = [...fields, ...Array(this.ACTIONS_AMOUNT).fill(null)];
    this.setState({ records, columnLabels });
  };

  addRecord = async data => {
    const newRecord = await addRecord({ data });
    
    if (newRecord)
      this.setState({
        records: [].concat(this.state.records, newRecord)
      });
  };

  deleteRecord = async id => {
    const isSuccess = await deleteRecord(id);
    if (isSuccess) {
      const records = this.state.records
        .slice()
        .filter(record => String(record._id) !== id);

      this.setState({
        records: records,
      });
    }
  };

  renderAddRecord = () => {
    const {
      ACTIONS_AMOUNT,
      addRecord,
      state: { columnLabels },
    } = this;

    // weeds actions off
    const filedNames = columnLabels.slice(
      0,
      columnLabels.length - ACTIONS_AMOUNT
    );

    return (
      <AddRecord
        fieldNames={filedNames}
        onSubmit={addRecord}
      />
    );
  };

  render() {
    if (!this.state.records) return null;
    const {
      deleteRecord,
      renderAddRecord,
      state: { records, columnLabels },
    } = this;

    return (
      <div className={'table-container'}>
        <Table
          columnLabels={columnLabels}
          records={records}
          deleteHandler={deleteRecord}
        />

        {renderAddRecord()}
      </div>
    );
  }
}

export default TableContainer;
