import React, { Component } from 'react';
import TableCell from '../TableCell/TableCell.js';
import './styles.css';

import { changeRecord } from '../../requests.js';
import {
  EditButton,
  DeleteButton,
  SumbitButton,
  CancelButton,
} from '../Actions/Actions.js';

class TableRow extends Component {
  state = {
    editMode: false,
    initialData: this.props.data,
    data: this.props.data,
  };

  validateInputData = () => {    
    const values = Object.values(this.state.data);    
    return !values.includes('');
  };

  onChange = ({ target: { name, value } }) => {
    const { data } = this.state;
    const changedData = Object.assign({}, data, { [name]: value });

    this.setState({ data: changedData });
  };

  toggleEdit = () => this.setState({ editMode: !this.state.editMode });

  onDelete = () => this.props.deleteHandler(this.props.id);

  onSubmit = async () => {
    const {
      state: { data, initialData },
      props: { id },
    } = this;

    if (data !== initialData) {      
      const isSuccess = await changeRecord(id, { data });
      
      this.exitEdit(isSuccess);
    } else this.toggleEdit();
  };

  onCancel = () => this.exitEdit(false);

  exitEdit = save => {
    const { initialData, data } = this.state;

    const newState = {
      editMode: false,
    };

    if (save) newState.initialData = data;
    else newState.data = initialData;

    this.setState(newState);
  };

  renderData = ([field, value]) => {
    const {
      onChange,
      state: { editMode },
    } = this;

    return (
      <TableCell
        key={field}
        field={field}
        value={value}
        editMode={editMode}
        onChange={onChange}
      />
    );
  };

  renderActions = (action, i) => {
    return <TableCell key={i} editMode={false} value={action} />;
  };

  render() {
    const {
      state: { data, editMode },
      toggleEdit,
      onCancel,
      onDelete,
      onSubmit,
    } = this;

    let actionsSet;
    let className = 'table__row';
    if (editMode) {
      actionsSet = [
        <SumbitButton onClick={onSubmit} disabled={!this.validateInputData()} />,
        <CancelButton onClick={onCancel} />,
      ];
      className += '--edit';
    } else {
      actionsSet = [
        <EditButton onClick={toggleEdit} />,
        <DeleteButton onClick={onDelete} />,
      ];
    }

    return (
      <tr className={className}>
        {Object.entries(data).map(this.renderData)}
        {actionsSet.map(this.renderActions)}
      </tr>
    );
  }
}

export default TableRow;
