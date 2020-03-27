import React from 'react';

function TableHead(props) {
  return (
    <thead className={'table__header'}>
      <tr>
        {props.headings.map((heading, i) =>
          <th key={i} className={'table__header-cell'}>{heading}</th>)}
      </tr>
    </thead>
  )
}

export default TableHead;