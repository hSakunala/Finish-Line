import React, { Component } from "react";
import * as d3 from "d3";
import { useContext, createContext, useState } from 'react';
export const NameContext = createContext();
const globalArray = [];
class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    const { data2 } = this.props;
  }

  componentDidUpdate() {
     // Calculate correlation matrix from data passed in app.js
    const { data2 } = this.props;
    this.Bar(data2)
  }

  Bar(data) {

  var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 350 - margin.top - margin.bottom;
    
  var groupSums= d3.rollup(data, v => v.length, d => d.category)
  console.log('YOOOOO: ', groupSums);
  
  var lst= [groupSums.get('B'),groupSums.get('A'),groupSums.get('C')]; 
  console.log('YELLOW: ', lst);

  var container = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X axis
    var x_data = data.map(d => d.category);
    var x_scale = d3
      .scaleBand()
      .domain(x_data)
      .range([margin.left, w])
      .padding(0.2);

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    // Add Y axis
    var y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(lst)])
      .range([h, 0]);

    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y_scale));

    
    container
      .selectAll("rect")
      .data(lst)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x_scale(100);
      })
      .attr("y", function (d) {
        return y_scale(65,59,76);})
      .attr("width", x_scale.bandwidth())
      .attr("height", function (d) {
        return h - y_scale(65,59,76);
      })
      .attr("fill", "#69b3a2");
  }
  
  render() {
    return (
      <svg className="child2_svg">
      <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;
