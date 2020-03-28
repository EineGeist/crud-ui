import React, { Component } from 'react';
import TableCell from './tableCell.js';

class TableRow extends Component {
  renderCell = (datum, i) => {
    return <TableCell
      key={i}
      datum={datum}
    />
  };

  render() {
    const { record, dataKey } = this.props;

    return (
      <tr
        data-key={dataKey}
        className={'table__row'}
      >
        {record.map(this.renderCell)}
      </tr>
    );
  }
}

export default TableRow;