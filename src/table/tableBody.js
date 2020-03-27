import React, { Component } from 'react';
import TableRow from './tableRow.js';

class TableBody extends Component {
  renderRow = (row, i) => {
    const { data } = this.props;
    const key = data[i].id;

    return <TableRow
      key={key}
      dataKey={key}
      data={Object.values(data[i])}
    />
  };

  render() {
    return (
      <tbody className={'table__body'}>
        {this.props.data.map(this.renderRow)}
      </tbody>
    );
  }
}

export default TableBody;