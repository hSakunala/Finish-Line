import React, { Component } from 'react';
import './App.css';
import Child1 from './child1';
import Child2 from './child2';

import * as d3 from 'd3';
import SampleDataset from './SampleDataset.csv';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      data: [], 
      selectedDropdownValue: 'A'
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount() {
    var self = this;
    d3.csv(SampleDataset, function (d) {
      return {
        x: parseInt(d.x),
        y: parseInt(d.y),
        category: d.category
      };
    })
      .then(function (csv_data) {
        self.setState({ data: csv_data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Function to store selected target in row 1 dropdown menu
  handleDropdownChange(event) {
    const newDropdownValue = event.target.value;
    //store dropdown value
    this.setState({ selectedDropdownValue: newDropdownValue });
  }

  // Function to update returnArray in the state
  updateReturnArray = (newReturnArray) => {
    this.setState({ returnArray: newReturnArray });
  };
  
componentDidUpdate(){
  console.log("Update",this.data)
}

render() {
  const { data } = this.state;

  return (
    <div className='parent'>
      <div className='row1'>

        <div className='child2'>
          <Child2 data2={data}/>
        </div>
      </div>

      <div className='row2'>
        <div className='child1'>
          <Child1 data1={data} selectedTarget={this.state.selectedDropdownValue}/>
        </div>

      </div>

    </div>
  );
}
}

export default App;
