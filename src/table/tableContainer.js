import React, { Component } from 'react';
import Table from './table.js';
import AddRecord from "./addRecord";

class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  renderAddRecord = () => {
    const { data } = this.state;

    return <AddRecord
      id={data.length}
      labels={Object.keys(data[0])}
      addHandler={this.addRecord}
    />
  };

  addRecord = record => {
    const data = this.state.data.slice();

    this.setState({
      data: data.concat(record)
    });
  };

  render() {
    const { data } = this.state;

    return (
      <div className={'table-container'}>
        <Table data={data} />
        <div className={'add-record'}>
          {this.renderAddRecord()}
        </div>
      </div>
    )
  }
}

export default TableContainer;