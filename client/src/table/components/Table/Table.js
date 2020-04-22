import React, { Component } from 'react';
import TableBody from '../TableBody/TableBody.js';
import TableHead from '../TableHead/TableHead.js';

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