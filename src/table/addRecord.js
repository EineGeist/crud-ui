import React, { Component } from 'react';
import AddRecordForm from "./addRecordForm.js";

class AddRecord extends Component {
  constructor(props) {
    super(props);

    const { id, labels } = props;

    const recordMap = createRecordMap(id, labels);
    this.state = {
      showForm: false,
      id: id,
      labels: labels,
      record: recordMap,
    };
  }

  toggleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm,
    });
  };

  handleInputChange = ({ target: { name, value } }) => {
    const record =
      new Map(this.state.record)
        .set(name, value);

    this.setState({
      record: record,
    })
  };

  handleSubmit = e => {
    e.preventDefault();

    const { record } = this.state;

    this.toggleShowForm();
    this.props.addHandler(Object.fromEntries(record));

    let { id, labels } = this.state;
    id++;

    const recordMap = createRecordMap(id, labels);
    this.setState({
      id: id,
      record: recordMap,
    })
  };

  renderAddButton = () => {
    return <button
      className={'add-record__open btn'}
      onClick={this.toggleShowForm}
    >Add a new record</button>
  };

  renderForm = () => {
    const { labels } = this.state;

    return <AddRecordForm
      labels={labels}
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

function createRecordMap(id, names) {
  const recordMap = [['id', id]];
  for (let i = 1; i < names.length; i++) {
    recordMap.push([names[i], null]);
  }

  return new Map(recordMap);
}

export default AddRecord;