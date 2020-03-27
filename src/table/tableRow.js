import React, { Component } from 'react';
import TableCell from './tableCell.js';

class TableRow extends Component {
  renderCell = (content, i) => {
    return <TableCell
      key={i}
      content={content}
    />
  };

  render() {
    return (
      <tr
        data-key={this.props.dataKey}
        className={'table__row'}
      >
        {this.props.data.map(this.renderCell)}
      </tr>
    );
  }
}

export default TableRow;