import React from 'react';
import ReactDOM from 'react-dom';
import TableContainer from './table/components/tableContainer.js';
import './index.css';

ReactDOM.render(<TableContainer headings={['Email', 'Age']}/>, document.getElementById('root'));