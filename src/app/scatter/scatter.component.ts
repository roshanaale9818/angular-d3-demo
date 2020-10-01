import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {
private margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
}
// for axis we reduce with with margin and later on when creating svg we will again add these in width
 private colors = d3.scaleOrdinal(d3.schemeDark2);
 private width = 700 - this.margin.left - this.margin.right;
 private height = 500 - this.margin.top - this.margin.bottom;
 private data = [{
    name: 'Dairy Milk',
    price: 25,
    rating: 9.2
},
{
    name: 'Bounty',
    price: 20,
    rating: 6
},
{
    name: 'Eclairs',
    price: 10,
    rating: 4
},
{
    name: 'Lacto fun',
    price: 5,
    rating: 7
},
{
    name: 'Mars',
    price: 30,
    rating: 5
},
{
    name: 'Choco Fun',
    price: 15,
    rating: 6
},

];
private svg;

  constructor() { }

  ngOnInit() {
    this.createSvg();
    this.drawDots();
  }
  private createSvg(){
  //creating svg here
  this.svg = d3.select('.scatter')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      // .style('background', 'darkblue')
      .attr('transform', `translate(${this.margin.left},${this.margin.right})`);
  }
  //drawing dots
  private drawDots(){
  const colors = this.colors;
      //drawing xaxis here
  const maxPrice = Math.max.apply(Math, this.data.map(function(d) { return d.price; }))
  console.log(maxPrice);
  const xAxis = d3.scaleLinear().domain([0, maxPrice])
      .range([0, this.width]);
  this.svg.append('g')
      .attr('transform', `translate(20,${this.height})`)
      .call(d3.axisBottom(xAxis));

  //add y axis
  const maxRating = Math.max.apply(Math, this.data.map(function(d) { return d.rating; }))
      //r;
  const yAxis = d3.scaleLinear()
      .domain([0, 10])
      .range([this.height, 0])
  this.svg.append('g')
      .attr('transform', `translate(20,0)`)
      .call(d3.axisLeft(yAxis));
  this.svg.append('circle')

  //adding dots
  const dots = this.svg.append('g');
  dots.selectAll('dot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', function(d) {
          return xAxis(d.price)
      })
      .attr('cy', function(d) {
          return yAxis(d.rating)
      })
      .attr('r', 7)
      .style('opacity', 0.6)
      .style('fill', function(d) {
          return colors(d.price)
      });
  //adding labeles
  dots.selectAll('text')
      .data(this.data)
      .enter()
      .append('text')
      .text(function(d) {
          return d.name;
      })
      .attr('x', function(d) {
          return xAxis(d.price)
      })
      .attr('y', function(d) {
          return yAxis(d.rating)
      });
  this.svg.append('g').append('text')
      .text('Rating')
      .attr('x', 10)
      .attr('y', 200);
  this.svg.append('g').append('text')
      .text('Price')
      .attr('x', '200')
      .attr('y', '480');

  }

}
