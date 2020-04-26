import React from 'react';
import './styles.css';

const TableHead = ({ columnLabels }) => (
  <thead className={'table__header'}>
    <tr>
      {columnLabels.map((label, i) => (
        <th key={i} className={'table__header-cell'}>
          {label}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHead;
