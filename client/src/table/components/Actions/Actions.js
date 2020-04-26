import React from 'react';
import './styles.css';

export const EditButton = ({ onClick }) => (
  <span className={'table__edit icon'} onClick={onClick}>
    &#xe905;
  </span>
);

export const DeleteButton = ({ onClick }) => (
  <span className={'table__delete icon'} onClick={onClick}>
    &#xe9ad;
  </span>
);

export const SumbitButton = ({ onClick }) => (
  <span className={'table__submit icon'} onClick={onClick}>
    &#xea10;
  </span>
);

export const CancelButton = ({ onClick }) => (
  <span className={'table__cancel icon'} onClick={onClick}>
    &#xea0f;
  </span>
);
