import React from 'react';
import TableRow from '../TableRow/TableRow.js';

const TableBody = ({ records, deleteHandler }) => {
  const renderRow = ({ _id, data }) => {
    return <TableRow
      key={_id}
      id={_id}
      data={data}
      deleteHandler={deleteHandler}
    />
  };

  return (
    <tbody className={'table__body'}>
      {records.map(renderRow)}
    </tbody>
  );
}

export default TableBody;