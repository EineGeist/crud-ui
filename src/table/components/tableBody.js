import React, { Component } from 'react';
import TableRow from './tableRow.js';

class TableBody extends Component {
  renderRow = (row, i) => {
    const record = this.props.records[i];
    const { _id, data } = record;

    return <TableRow
      key={_id}
      id={_id}
      data={data}
    />
  };

  render() {
    const { records } = this.props;

    return (
      <tbody className={'table__body'}>
        {records.map(this.renderRow)}
      </tbody>
    );
  }
}

export default TableBody;