import React, { Component } from 'react';

class TableCell extends Component {
  handleInputChange = ({ target: { value } }) => {
    const { keyProp } = this.props;
    this.props.inputChangeHandler(keyProp, value);
  };

  render() {
    const { editMode } = this.props;
    let { value } = this.props;
    if (editMode && !value) value = '';

    return (
      <td
        className={'table__cell' + (editMode ? '' : '')}
      >
        {
          editMode
            ? <input
                className={'table__cell-input'}
                onChange={this.handleInputChange}
                type={'text'}
                value={value}
              />
            : value
        }
      </td>
    );
  }
}

export default TableCell;