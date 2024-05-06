import React, { Component } from "react";
import * as d3 from "d3";
import { useContext, createContext, useState } from 'react';
export const NameContext = createContext();

class ChildTree extends Component {
  constructor(props) {
    super(props);
    this.state = { numericalVariables: ["total_bill", "tip", "size"]
  };
  }

  componentDidMount() {
    // Calculate correlation matrix from data passed in app.js
    var returnArray;
    returnArray = ['total_bill', 'tip']
    this.props.updateReturnArray(returnArray);
  }
  componentDidUpdate() {
     // Calculate correlation matrix from data passed in app.js
    var data= {
      "name": "Root",
      "children": [
        {
          "name": "Branch 1",
          "children": [
            {
              "name": "Leaf 1",
              "size": 10,
              "color": "red"
            },
            {
              "name": "Leaf 2",
              "size": 20,
              "color": "blue"
            }
          ]
        },
        {
          "name": "Branch 2",
          "children": [
            {
              "name": "Leaf 3",
              "size": 15,
              "color": "green"
            },
            {
              "name": "Leaf 4",
              "size": 25,
              "color": "purple",
              "children": [
                {
                  "name": "Subleaf",
                  "size": 5,
                  "color": "orange"
                }
              ]
            }
          ]
        }
      ]
    };
    // make a d3 tree with the data above
    var tree = d3.tree().size([700, 220]);
    var root = d3.hierarchy(data);
    tree(root);

    var nodes = root.descendants();
    var links = root.links();

    // create svg element
    var svg = d3.select(".child2_svg")
      .attr("width", 800)
      .attr("height", 300)
      .append("g")
      .attr("transform", "translate(50, 50)")
      .classed("g_2", true);

    // Links
    svg.selectAll('.link')
      .data(links)
      .join('line')
      .classed('link', true)
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    // Nodes
    svg.selectAll('.node')
      .data(nodes)
      .join('circle')
      .classed('node', true)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 4);

    // Labels
    svg.selectAll('.label')
      .data(root.descendants())
      .join('text')
      .classed('label', true)
      .attr('x', d => d.x)
      .attr('y', d => d.y - 10)
      .text(d => d.data.name);

    svg.selectAll(".tooltip_div")
      .data([0])  // binds a single element to the tooltip
      .join("div")  // joins the data to a div element
      .attr("class", "tooltip_div")  // adds a CSS class for styling
      .style("position", "absolute")  // uses absolute positioning
      .style("visibility", "hidden")
  }
  
  render() {
    return (
      <svg className="child2_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
}

export default ChildTree;
