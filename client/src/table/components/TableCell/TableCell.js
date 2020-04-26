import React from 'react';
import './styles.css';

function TableCell({ editMode, field, value, onChange }) {
  const cellContent = editMode 
    ? <CellInput
        field={field}
        value={value}
        onChange={onChange} 
      />
    : value;

  return (
    <td 
      key={field}
      className="table__cell"
    >
      {cellContent}
    </td>
  )
}

function CellInput({field, value, onChange}) {  
  return (
    <input 
      className={'table__cell-input'}
      type="text"
      name={field}
      value={value}
      onChange={onChange}
    />
  );
}

export default TableCell;