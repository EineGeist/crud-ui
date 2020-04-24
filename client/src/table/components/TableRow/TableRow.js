import React, { Component } from 'react';
import TableCell from '../TableCell/TableCell.js';

import { changeRecord } from '../../requests.js';
import actions from '../../actions.js';

class TableRow extends Component {
  constructor(props) {
    super(props);
    const { data } = props;

    this.state = {
      editMode: false,
      initialData: data,
      data,
    };
  }

  onInputChange = ({ target: { name, value } }) => {
    const { data } = this.state;
    const changedData = Object.assign({}, data, { [name]: value });

    this.setState({
      data: changedData,
    });
  };

  handleClick = ({ target }) => {
    if (target.closest('.table__edit')) {
      this.setState({ editMode: true });
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

  handleSubmit = async () => {
    const {
      state: { data, initialData },
      props: { id },
    } = this;

    if (data !== initialData) {
      await changeRecord(id, { data });
      this.exitEditMode();
    } else this.setState({ editMode: false });
  };

  exitEditMode = () => {
    const { initialData } = this.state;

    this.setState({
      editMode: false,
      data: initialData,
    });
  };

  renderData = ([field, value]) => {
    const { editMode } = this.state;

    return (
      <TableCell
        key={field}
        field={field}
        value={value}
        editMode={editMode}
        onChange={this.onInputChange}
      />
    );
  };

  renderActions = (action, i) => {
    return (
      <TableCell
        key={i}
        editMode={false}
        value={action}
      />
    );
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
      <tr onClick={this.handleClick} className={className}>
        {Object.entries(data).map(this.renderData)}
        {actionsSet.map(this.renderActions)}
      </tr>
    );
  }
}

export default TableRow;
