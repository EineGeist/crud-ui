import React from 'react';

function TableHead(props) {
  return (
    <thead>
      <tr>
        {props.headings.map((heading, i) => <th key={i}>{heading}</th>)}
      </tr>
    </thead>
  )
}

export default TableHead;