import React, { Component } from 'react';
import TableCell from '../TableCell/TableCell.js';

import requests from "../../requests.js";
import actions from "../../actions.js";

class TableRow extends Component {
  constructor(props) {
    super(props);
    const { data } = props;

    this.state = {
      editMode: false,
      initialData: data,
      data: data,
    };
  };

  onInputChange = ({ target }) => {
    const {name, value} = target
    const { data } = this.state;
    const changedData = Object.assign({}, data, {[name]: value});

    this.setState({
      data: changedData,
    });
  };

  handleClick = ({ target }) => {
    if (target.closest('.table__edit')) {
      this.setState({editMode: true});
    } else if (target.closest('.table__delete')) {
      const { id } = this.props;
      this.props.deleteHandler(id);
    } else if (target.closest('.table__submit')) {
      this.handleSubmit();
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
    const [ field, value ] = entry;    

    return <TableCell
      key={field}
      field={field}
      value={value}
      editMode={editMode}
      onChange={this.onInputChange}
    />
  };

  renderActions = (action, i) => {
    return <TableCell
      key={i}
      editMode={false}
      value={action}
    />
  };

  render() {
    const { data, editMode } = this.state;

    let actionsSet;
    let className = 'table__row';
    if (editMode) {
      actionsSet = [actions.submit, actions.cancel];
      className += '--edit';
    } else {
      actionsSet = [actions.edit, actions.delete];
    }

    return (
      <tr
        onClick={this.handleClick}
        className={className}
      >
        {Object.entries(data).map(this.renderData)}
        {actionsSet.map(this.renderActions)}
      </tr>
    );
  };
}

export default TableRow;