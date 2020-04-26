import React from 'react';
import './styles.css';

export const EditButton = ({ onClick }) => (
  <button className={'table__edit icon'} onClick={onClick}>
    &#xe905;
  </button>
);

export const DeleteButton = ({ onClick }) => (
  <button className={'table__delete icon'} onClick={onClick}>
    &#xe9ad;
  </button>
);

export const SumbitButton = ({ onClick, disabled }) => (
  <button 
    className={'table__submit icon'}
    type="submit"
    onClick={onClick}
    disabled={disabled}
  >
    &#xea10;
  </button>
);

export const CancelButton = ({ onClick }) => (
  <button className={'table__cancel icon'} onClick={onClick}>
    &#xea0f;
  </button>
);
