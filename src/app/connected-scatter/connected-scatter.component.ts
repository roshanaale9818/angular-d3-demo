import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-connected-scatter',
  templateUrl: './connected-scatter.component.html',
  styleUrls: ['./connected-scatter.component.css']
})
export class ConnectedScatterComponent implements OnInit {
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
// price of hero honda bikes over the recent years
private data = [{
    price: 20000,
    year: 2010
},
{
    price: 22000,
    year: 2011
},
{
    price: 16000,
    year: 2012
},
{
    price: 18000,
    year: 2013
},
{
    price: 50000,
    year: 2014
},
{
    price: 40000,
    year: 2015
},
{
    price: 90000,
    year: 2016
},
{
    price: 80000,
    year: 2017
},
{
    price: 40000,
    year: 2018
},
{
    price: 45000,
    year: 2019
},
{
  price: 70000,
  year: 2020
},
];
private svg;

  constructor() { }

  ngOnInit() {
    this.createSvg();
    this.drawConnectedScatter();
  }
  private createSvg(){
    this.svg = d3.select('.connected-scatter')
    .append('svg')
    .attr('width', this.width + this.margin.left + this.margin.right)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    // .style('background', 'darkblue')
    .attr('transform', `translate(${this.margin.left},${this.margin.right})`);

  }
  private drawConnectedScatter(){
      const colors = this.colors;
      //drawing xaxis here
  const xAxis = d3.scaleLinear().domain([2010, 2030])
  .range([0, this.width]);
  this.svg.append('g')
  .attr('transform', `translate(40,${this.height})`)
  .call(d3.axisBottom(xAxis));



  //add y axis
  const yAxis = d3.scaleLinear()
  .domain([10000, 100000])
  .range([this.height, 0])
  this.svg.append('g')
  .attr('transform', `translate(40,0)`)
  .call(d3.axisLeft(yAxis));


  //adding line
  const path = this.svg.append('g');
  path.append('path')
  .datum(this.data)
  .attr('fill', 'none')
  .attr('stroke', '#000')
  .attr('stroke-width', 1.5)
  .attr('d', d3.line()
      .x(function(d:any) { return xAxis(d.year) })
      .y(function(d:any) { return yAxis(d.price) }))
  .attr('transform', 'translate(40,0)');


  // adding dots
  const dots = this.svg.append('g')
  .attr('transform', 'translate(40,0)');
  dots.selectAll('dot')
  .data(this.data)
  .enter()
  .append('circle')
  .attr('cx', function(d) {
      return xAxis(d.year);
  })
  .attr('cy', function(d) {
      return yAxis(d.price);
  })
  .attr('r', 5)
  .style('opacity', 0.6)
  .style('fill', function(d) {
      return colors(d.price);
  });
  this.svg.append('g').append('text')
  .text('Price')
  .attr('x', 10)
  .attr('y', 200)
  .style('font-size', '28');
  this.svg.append('g').append('text')
  .text('year')
  .attr('x', '200')
  .attr('y', '490')
  .style('font-size', '28');
  }

}
