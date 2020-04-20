import React, { Component } from 'react';
import TableBody from './tableBody.js';
import TableHead from './tableHead.js';
import './tableStyles.css';

class Table extends Component {
  render() {
    const { columnLabels, records } = this.props;

    return (
      <table className={'table'}>
        <TableHead columnLabels={columnLabels} />
        <TableBody
          records={records}
          deleteHandler={this.props.deleteHandler}
        />
      </table>
    );
  }
}

export default Table;