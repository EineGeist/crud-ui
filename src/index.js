import React from 'react';
import ReactDOM from 'react-dom';
import TableContainer from './table/tableContainer.js';
import './index.css';

import data from './table/data.json';

ReactDOM.render(<TableContainer data={data} />, document.getElementById('root'));