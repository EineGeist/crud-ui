import React from 'react';

function TableCellAction({ value }) {
  return (
    <td
      className={'table__cell'}
    >
      {value}
    </td>
  );
}

export default TableCellAction;