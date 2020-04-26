import React, { Component } from 'react';
import AddRecordForm from '../AddRecordForm/AddRecordForm.js';
import './styles.css';

class AddRecord extends Component {
  setInputData = () => Object.fromEntries(
    this.props.fieldNames.map(fieldName => [fieldName, ''])
  );

  state = {
    showForm: false,
    inputData: this.setInputData(),
  };

  toggleShowForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  resetInputData = () => {
    this.setState({ inputData: this.setInputData() });
  };

  validateInputData = () => {    
    const values = Object.values(this.state.inputData);    
    return !values.includes('');
  };

  onChange = ({ target: { name, value } }) => {
    const changedData = Object.assign({}, this.state.inputData, {[name]: value});

    this.setState({ inputData: changedData });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.inputData);
    this.toggleShowForm();
    this.resetInputData();
  };

  onClose = () => {
    this.toggleShowForm();
    this.resetInputData();
  };

  renderAddButton = () => {
    return (
      <button
        className={'add-record__show btn'}
        onClick={this.toggleShowForm}
      >
        Add a new record
      </button>
    );
  };

  renderForm = () => (
    <AddRecordForm
      fieldNames={this.props.fieldNames}
      onChange={this.onChange}
      onSubmit={this.onSubmit}
      onClose={this.onClose}
      submitDisabled={!this.validateInputData()}
    />
  );

  render() {
    return (
      <div className={'add-record'}>
        {this.state.showForm
        ? this.renderForm() 
        : this.renderAddButton()}
      </div>
    )
  };
}

export default AddRecord;
