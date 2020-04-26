import React, { Component } from 'react';
import './styles.css';

class AddRecordForm extends Component {
  renderTextInput = name => (
    <label className={'add-record__field'} key={name}>
      {name}:
      <input
        type={'text'}
        name={name}
        className={'add-record__input'}
        onChange={this.props.onChange}
      />
    </label>
  );

  render() {
    const { 
      props: { fieldNames, onSubmit, onClose, submitDisabled },
      renderTextInput 
    } = this;

    return (
      <form>
        {fieldNames.map(renderTextInput)}

        <div className={'add-record__btns'}>
          <input
            type={'submit'}
            className={'add-record__submit btn btn--accent'}
            onClick={onSubmit}
            value={'Add'}
            disabled={submitDisabled}
          />

          <button
            type={'button'}
            className={'add-record__close btn'}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </form>
    );
  }
}

export default AddRecordForm;
