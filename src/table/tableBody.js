import React, { Component } from 'react';
import TableRow from './tableRow.js';

class TableBody extends Component {
  renderRow = (row, i) => {
    const { _id, data } = this.props.records[i];

    return <TableRow
      key={_id}
      dataKey={_id}
      record={Object.values(data)}
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