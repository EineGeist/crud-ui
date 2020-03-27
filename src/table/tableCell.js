import React from 'react';

function TableCell(props) {
  return (
    <td className={'table__cell'}>
      {props.content}
    </td>
  );
}

export default TableCell;