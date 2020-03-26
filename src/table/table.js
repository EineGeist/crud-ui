import React, { Component } from 'react';
import TableBody from './tableBody.js';
import TableHead from './tableHead.js';
import './tableStyles.css';

class Table extends Component {

  render() {
    const { data } = this.props;

    return (
      <table className={'table'}>
        <TableHead headings={Object.keys(data[0])} />
        <TableBody data={data} />
      </table>
    );
  }
}

export default Table;