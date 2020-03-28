import React, { Component } from 'react';

class AddRecordForm extends Component {
  renderTextInput = name => {
    return (
      <label
        className={'add-record__fieldName'}
        key={name}
      >
        {name}:
        <input
          type={'text'}
          name={name}
          className={'add-record__input'}
          onChange={this.props.handleInputChange}
        />
      </label>
    )
  };

  render() {
    const { fieldNames } = this.props;

    return (
      <form>
        {fieldNames
          .map(this.renderTextInput)
        }

        <div className={'add-record__btns'}>
          <input
            type={'submit'}
            className={'add-record__submit btn'}
            onClick={this.props.handleSubmit}
            value={'Add'}
          />

          <button
            type={'button'}
            className={'add-record__close btn'}
            onClick={this.props.closeForm}
          >Close</button>
        </div>
      </form>
    )
  };
}

export default AddRecordForm;