import * as d3 from 'd3';
import { equalIntervalBreaks } from 'simple-statistics';
import makeDataArray from './makeDataArray';
import regressionmb from './regressionmb';
import regressionR2 from './regressionR2';

export default (gL) => {

  // set vis dimensions
  const width = gL.vis.totalWidth - gL.vis.margin.left - gL.vis.margin.right;
  const height = gL.vis.totalHeight - gL.vis.margin.top - gL.vis.margin.bottom;
  const visTransTime = 750;

  // get the data
  gL.activeData = makeDataArray(gL.seriesA, gL.seriesB);

  let data = gL.activeData;

  let regLineInfo = regressionmb(data);
  let regR2Info = regressionR2(data);

  let stPt = d3.min(data, d => Number(d.x));
  let endPt = d3.max(data, d => Number(d.x));
  
  let regLinePts = [
    {
      x1: stPt, 
      y1: (regLineInfo.m * stPt + regLineInfo.b),
      x2: endPt,
      y2: (regLineInfo.m * endPt + regLineInfo.b)
    }
  ]

  let xScale = d3.scaleLinear()
    .range([0, width]);

  let yScale = d3.scaleLinear()
    .range([height, 0]);

  //scale the axes based on data ranges
  xScale
    .domain([0, d3.max(data, d => Number(d.x))])

  yScale
    .domain([0, d3.max(data, d => Number(d.y))])

  // set local var for svg
  let svg = gL.svgVis;

  let tooltip = gL.tooltip;

    let dataPtsUpdate = svg.selectAll('.pts')
      .data(data, d => d.f)
      .attr('r', 6)
      .call(update => update.transition()
        .duration(visTransTime)
        .attr("cx", function(d) { return xScale(d.x); })
        .attr("cy", function(d) { return yScale(d.y); })
      );

  
    let dataPtsEnter = dataPtsUpdate
    .enter().append('circle')
    .attr('class', d => `pts f-${d.f} x-${d.x}  y-${d.y} c-${d.cn} s-${d.s}`)
    .attr('r', 6)
    .attr("cx", function(d) { return xScale(d.x); })
    .attr("cy", function(d) { return yScale(d.y); })
    .on('mouseover', function(event,d) {
      tooltip
        .transition()		
        .duration(200)		
        .style("opacity", .9);		
      tooltip
        .html(d.cn + ",<br/>"  + d.s)	
        .style("left", (event.pageX) + "px")		
        .style("top", (event.pageY - 28) + "px");	
      })
    .on("mouseout", function(d) {		
      tooltip
        .transition()		
        .duration(500)		
        .style("opacity", 0);	
    })
    .style('fill', d => {
      if (d.u == 'Urban') {
        return '#a44100';
      } 

      return '#006954';

    })
    .style('stroke', d => {
      if (d.u == 'Urban') {
        return '##a44100';
      } 

      return '#006954';

    });

  let dataPtsExit = dataPtsUpdate
    .exit() 
    .attr('r', 6)
    .call(exit => exit.transition().duration(250)
      .attr('r', 0)
    )
    .remove();


  /* regression line */

  let regLineUpdate = svg.selectAll('.regline')
    .data(regLinePts)
    .call(update => update.transition()
      .duration(visTransTime)
    .attr('x1', d => xScale(d.x1) )
    .attr('x2', d => xScale(d.x2) )
    .attr('y1', d => yScale(d.y1) )
    .attr('y2', d => yScale(d.y2) )
    );
  
  let regLineAdd = regLineUpdate  
    .enter().append('line')  
    .attr('class', 'regline')
    .attr('x1', d => xScale(d.x1) )
    .attr('x2', d => xScale(d.x2) )
    .attr('y1', d => yScale(d.y1) )
    .attr('y2', d => yScale(d.y2) );

  // Add the X Axis
  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);

  svg.append('g')
    .attr('transform', 'translate(0, ' + (height) + ')')
    .attr('class', 'x axis');

  svg.append('g')
    .attr('class', 'y axis');

  svg.select('.x.axis')
    .transition()
    .duration(visTransTime)
    .call(xAxis);

  svg.select('.y.axis')
    .transition()
    .duration(visTransTime)
    .call(yAxis);

  // X axis label
  svg.append('text')
    .attr('class', 'x-axis-label')
    .style("font", "14px arial")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + gL.vis.margin.top + 25);

  svg.select('.x-axis-label')
    .transition()
    .duration(visTransTime)
    .text(() => {

      let tmpTxt = (gL.seriesA.a == "All" ? '(all ages)' : '(under 65)') 

      return `${gL.seriesA.m} of ${gL.seriesA.c} for ${gL.seriesA.r}s ${tmpTxt}`;
    });  

    // Y axis label
    svg.append('text')
      .attr('class', 'y-axis-label')
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -gL.vis.margin.left+20)
      .attr("x", -gL.vis.margin.top)
  
  svg.select('.y-axis-label')
    .transition()
    .duration(visTransTime)
    .text(`${gL.seriesB.m} of ${gL.seriesB.c} for ${gL.seriesB.r}s`);  

  // regression eqn
  svg.append('text')
    .attr('class', 'reg-eqn')
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", 25);

  svg.select('.reg-eqn')
    .transition()
    .duration(visTransTime)
    .text(`y = ${Math.round(regLineInfo.m*100)/100}x + ${Math.round(regLineInfo.b*100)/100}`);  

  svg.append('text')
    .attr('class', 'rsq')
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", 50);

  svg.select('.rsq')
    .transition()
    .duration(visTransTime)
    .text(`r\u00B2 = ${Math.round(regR2Info*100)/100}`); 


    
}