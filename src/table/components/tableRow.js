import React, { Component } from 'react';
import TableCell from './tableCell.js';
import TableCellAction from './tableCellAction.js';

import requests from "../requests.js";
import actions from "../actions.js";

class TableRow extends Component {
  constructor(props) {
    super(props);
    const { data } = props;

    this.state = {
      editMode: false,
      initialData: data,
      data: data,
    }
  };

  handleInputChange = (key, value) => {
    const { data } = this.state;
    const changedData = Object.assign({}, data, {[key]: value});

    this.setState({
      data: changedData,
    });
  };

  handleClick = ({ target }) => {
    if (target.closest('.table__submit')) {
      this.handleSubmit();
    } else if (target.closest('.table__edit')) {
      this.setState({editMode: true});
    } else if (target.closest('.table__cancel')) {
      this.setState({
        editMode: false,
        data: this.state.initialData,
      });
    }
  };

  handleSubmit = () => {
    const { data, initialData } = this.state;
    const { id } = this.props;

    if (data !== initialData) {
      requests.CHANGE_RECORD(id, {data: data})
        .then(response => {
          if (response.ok) {
            this.setState({
              editMode: false,
              initialData: data,
            });
          } else throw new Error(`Table change record failed: ${response.status} (${response.statusText})`);
        })
        .catch(error => {throw error});
    } else this.setState({editMode: false});
  };

  renderData = entry => {
    const { editMode } = this.state;
    const key = entry[0];
    const value = entry[1];

    return <TableCell
      key={key}
      keyProp={key}
      value={value}
      inputChangeHandler={this.handleInputChange}
      editMode={editMode}
    />
  };

  renderActions = (action, i) => {
    return <TableCellAction
      key={i}
      value={action}
    />
  };

  render() {
    const { id } = this.props;
    const { data, editMode } = this.state;
    const rowClassName = 'table__row';

    const actionsSet = editMode
      ? [actions.submit, actions.cancel]
      : [actions.edit, actions.delete];

    return (
      <tr
        onClick={this.handleClick}
        data-key={id}
        className={rowClassName + (editMode ? '--edit' : '')}
      >
        {Object.entries(data).map(this.renderData)}
        {actionsSet.map(this.renderActions)}
      </tr>
    );
  };
}

export default TableRow;