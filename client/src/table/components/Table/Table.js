import React from 'react';
import TableBody from '../TableBody/TableBody.js';
import TableHead from '../TableHead/TableHead.js';
import './styles.css';

const Table = ({ columnLabels, records, deleteHandler }) => (
  <table className={'table'}>
    <TableHead columnLabels={columnLabels} />
    <TableBody
      records={records}
      deleteHandler={deleteHandler}
    />
  </table>
);

export default Table;