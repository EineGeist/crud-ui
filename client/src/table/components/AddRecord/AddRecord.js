import React, { Component } from 'react';
import AddRecordForm from "../AddRecordForm/AddRecordForm.js";

class AddRecord extends Component {
  constructor(props) {
    super(props);

    const { fieldNames } = props;

    const dataMap = createDataMap(fieldNames);
    this.state = {
      showForm: false,
      fieldNames: fieldNames,
      data: dataMap,
    };
  }

  toggleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm,
    });
  };

  handleInputChange = ({ target: { name, value } }) => {
    const data =
      new Map(this.state.data)
        .set(name, value);

    this.setState({
      data: data,
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    this.toggleShowForm();

    const { fieldNames, data: inputData } = this.state;

    const data = Object.fromEntries(inputData);
    this.props.addHandler(data);

    const dataMap = createDataMap(fieldNames);
    this.setState({
      data: dataMap,
    })
  };

  renderAddButton = () => {
    return <button
      className={'add-record__open btn'}
      onClick={this.toggleShowForm}
    >Add a new record</button>
  };

  renderForm = () => {
    const { fieldNames } = this.state;

    return <AddRecordForm
      fieldNames={fieldNames}
      handleInputChange={this.handleInputChange}
      handleSubmit={this.handleSubmit}
      closeForm={this.toggleShowForm}
    />
  };

  renderAddRecord = () => {
    const { showForm } = this.state;

    return showForm ? this.renderForm() : this.renderAddButton();
  };

  render() {
    return this.renderAddRecord();
  }
}

function createDataMap(fieldNames) {
  const data = [];
  for (let i = 0; i < fieldNames.length; i++) {
    data.push([fieldNames[i], null]);
  }

  return new Map(data);
}

export default AddRecord;