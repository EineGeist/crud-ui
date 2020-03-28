import React from 'react';

function TableHead(props) {
  const { columnLabels } = props;

  return (
    <thead className={'table__header'}>
      <tr>
        {columnLabels.map((label, i) =>
          <th key={i} className={'table__header-cell'}>{label}</th>)}
      </tr>
    </thead>
  )
}

export default TableHead;