import React, { Component } from 'react';
import TableRow from './tableRow.js';

class TableBody extends Component {
  renderRow = (row, i) => {
    const { data } = this.props;

    return <TableRow
      key={data[i].id}
      data={Object.values(data[i])}
    />
  };

  render() {
    return (
      <tbody>
        {this.props.data.map(this.renderRow)}
      </tbody>
    );
  }
}

export default TableBody;