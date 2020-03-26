import React, { Component } from 'react';
import TableRow from './tableRow.js';

class TableBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
    };
  }

  renderRow = (row, i) => {
    const { data } = this.state;
    return <TableRow
      key={data[i].id}
      data={Object.values(data[i])}
    />
  };

  render() {
    return (
      <tbody>
        {this.state.data.map(this.renderRow)}
      </tbody>
    );
  }
}

export default TableBody;