import React from 'react';

function TableCell(props) {
  return (
    <td className={'table__cell'}>
      {props.datum}
    </td>
  );
}

export default TableCell;