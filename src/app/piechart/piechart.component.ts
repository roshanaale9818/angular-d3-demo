import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
private svg;
private height = 500;
private width = 600;
private margin = 50;
private radius = Math.min(this.width, this.height) / 2 - this.margin;
private colors = d3.scaleOrdinal(d3.schemeDark2);
private details = [{
  grade: "A+",
  number: 8
}, {
  grade: "A",
  number: 21
}, {
  grade: "B",
  number: 15
}, {
  grade: "C",
  number: 29
}, {
  grade: "D",
  number: 11
}, {
  grade: "F",
  number: 6
}];
private pieData:any = d3.pie().value(function(d:any) {
  return d.number;
});

  constructor() { }

  ngOnInit() {
    this.createSvg();
    this.drawPieChart();
  }
  private createSvg(){
    this.svg = d3.select(".piechart")
    .append("svg")
    .attr('width', this.width)
    .attr('height', this.height)
    .style('background', 'pink')
    .append('g')
    .attr('transform', `translate(${this.width/2},${this.height/2})`);
  }


  private drawPieChart(){
  const colors = this.colors;
    //calcuating their pie value with pieData initilizing to the d3 functions
  const pieData = this.pieData;
  //now we define the arcs as segments
  const segments = d3.arc().innerRadius(0).outerRadius(this.radius);
  //drawing charts now passing the piedata value
  this.svg.selectAll('path')
    .data(pieData(this.details))
    .enter()
    .append('path')
    .attr('d', segments)
    .attr('fill', function(d, i) {
        return colors(d.data.number);
    })
    .attr('stroke', 'darkgreen')
    .attr('stroke-width', '1px');
    const gradeLabel = d3.arc().innerRadius(80).outerRadius(this.radius);
    this.svg.selectAll('labels')
        .data(pieData(this.details))
        .enter()
        .append('text')
        .text(function(d) {
            return d.data.number;
        })
        .attr(`transform`, function(d) {
            return `translate(${gradeLabel.centroid(d)})`
        })
        .style('text-anchor', 'middle')
        .style('font-size', 15)
        .style('color', 'white');

    //we make rectagle in g tag
    const rectangle = this.svg.append('g');

    rectangle.selectAll('dots')
        .data(this.details)
        .enter()
        .append('rect')
        .attr('height', 10)
        .attr('width', 10)
        .style('fill', function(d, i) {
            return colors(d.number);
        })
        .attr("x", 220)
        .attr("y", function(d, i) {
            return 100 + i * (20 + 5)
        });

    rectangle.selectAll('text')
        .data(this.details)
        .enter()
        .append('text')
        .text(function(d) {
            return d.grade;
        })
        .style('font-size', '10')
        .attr("x", 240)
        .attr("y", function(d, i) { return 100 + i * (20 + 5) + (20 / 2) });
  }
}
