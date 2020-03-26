import React from 'react';
import ReactDOM from 'react-dom';
import Table from './table/table.js';
import './index.css';

import data from './table/data.json';

ReactDOM.render(<Table data={data} />, document.getElementById('root'));