import * as d3 from 'd3';
import getDescStats from './getDescStats';

let remZeros = (d) => {

  let retArray = d.filter(el => Number(el.v) !== 0);
  return retArray
  
};


export default (gL) => {

  // following this tutorial: https://d3-graph-gallery.com/graph/histogram_basic.html

  // set vis dimensions
  const width = gL.vis.totalWidth - gL.vis.margin.left - gL.vis.margin.right;
  const height = (gL.vis.totalHeight/3) - gL.vis.margin.top - gL.vis.margin.bottom;
  const visTransTime = 750;
  let boxHtAdj = 0.4;


  //let data = remZeros(gL.seriesB.byCounty);
  let data = gL.activeData

  let descStats = getDescStats(data, 'x');
  let boxPData = [descStats];
  


  let svg = gL.svgHist

  let xScale = d3.scaleLinear()
    .domain([0, d3.max(gL.activeData, d => Number(d.x))])
    .range([0, width]);

  let yScale  = d3.scaleLinear()
    .range([height, 0]);

  let histogram = d3.bin()
    .value(function(d) { return Number(d.x); })   // I need to give the vector of value
    .domain(xScale.domain())  // then the domain of the graphic
    .thresholds(xScale.ticks(70)); // then the numbers of bins

  // And apply this function to data to get the bins
  let bins = histogram(data);  

   // Scale the range of the data in the y domain
   yScale.domain([0, d3.max(bins, function(d) { return d.length; })]);

  // append the bar rectangles to the svg element
  let histBarsUpdate = svg.selectAll(".x-bar")
    .data(bins)
    .attr("class", "x-bar")
    .attr("x", 1)
    .call(update => update.transition()
      .duration(visTransTime)
      .attr("transform", function(d) {
		    return "translate(" + xScale(d.x0) + "," + yScale(d.length) + ")"; 
      })
      .attr("width", function(d) { return xScale(d.x1) - xScale(d.x0) ; })
      .attr("height", function(d) { return height - yScale(d.length); })
    );

  let histBarEnter = histBarsUpdate
    .enter().append("rect")
    .attr("class", "x-bar")
    .attr("x", 1)
    .attr("transform", function(d) {
      return "translate(" + xScale(d.x0) + "," + yScale(d.length) + ")"; 
    })
    .attr("width", function(d) { return xScale(d.x1) - xScale(d.x0) ; })
    .attr("height", function(d) { return height - yScale(d.length); })

  let histBarExit = histBarsUpdate
    .exit()
    .call(exit => exit.transition().duration(250)
      .style('opacity', 0)
    )
    .remove();

  // box plot median
  let boxPLineUpdate = svg.selectAll('.bp-line')
    .data(boxPData)
    .attr('class', 'box-p bp-line')
    .call(update => update.transition()
    .duration(visTransTime)
    .attr('transform', d =>`translate(${xScale(d.median)}, ${height*boxHtAdj})`)
  );

  let boxPLineEnter = boxPLineUpdate
    .enter().append('line')
    .attr('class', 'box-p bp-line')
    .attr('transform', d =>`translate(${xScale(d.median)}, ${height*boxHtAdj})`)
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', 20);

  // box plot iqr box
  let boxPBoxUpdate = svg.selectAll('.bp-box')
  .data(boxPData)
    .attr('class', 'box-p bp-box')
    .call(update => update.transition()
    .duration(visTransTime)
    .attr('transform', d => `translate(0, ${height * boxHtAdj})`)
    .attr('x', d => xScale(d.quant25))
    .attr('y', 0)
    .attr('width', d => xScale(d.quant75) - xScale(d.quant25))
    .attr('height', 20)
  );

  let boxPBoxEnter = boxPBoxUpdate
    .enter().append('rect')
    .attr('class', 'box-p bp-box')
    .attr('transform', d => `translate(0, ${height * boxHtAdj})`)
    .attr('x', d => xScale(d.quant25))
    .attr('y', 0)
    .attr('width', d => xScale(d.quant75) - xScale(d.quant25))
    .attr('height', 20)


  // box plot min line
  let boxPMinUpdate = svg.selectAll('.bp-min')
    .data(boxPData)
    .attr('class', 'box-p bp-min')
    .call(update => update.transition()
    .duration(visTransTime)
    .attr('transform', d =>`translate(${xScale(d.lowerLim)}, ${height*boxHtAdj})`)
  );

  let boxPMinEnter = boxPMinUpdate
    .enter().append('line')
    .attr('class', 'box-p bp-min')
    .attr('transform', d =>`translate(${xScale(d.lowerLim)}, ${height*boxHtAdj})`)
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', 20);

  // box plot max line
  let boxPMaxUpdate = svg.selectAll('.bp-max')
    .data(boxPData)
    .attr('class', 'box-p bp-max')
    .call(update => update.transition()
    .duration(visTransTime)
    .attr('transform', d =>`translate(${xScale(d.upperLim)}, ${height*boxHtAdj})`)
  );

  let boxPMaxEnter = boxPMaxUpdate
    .enter().append('line')
    .attr('class', 'box-p bp-max')
    .attr('transform', d =>`translate(${xScale(d.upperLim)}, ${height*boxHtAdj})`)
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', 20);

  // box plot line from q75^ tp upper
  let boxPToUpperUpdate = svg.selectAll('.bp-linetoupper')
    .data(boxPData)
    .attr('class', 'box-p bp-linetoupper')
    .call(update => update.transition()
    .duration(visTransTime)
    .attr('transform', d =>`translate(${xScale(d.quant75)}, ${height*boxHtAdj})`)
    .attr('x2', d => xScale(d.upperLim) - xScale(d.quant75))
  );

  let boxPToUpperEnter = boxPToUpperUpdate
    .enter().append('line')
    .attr('class', 'box-p bp-linetoupper')
    .attr('transform', d =>`translate(${xScale(d.quant75)}, ${height*boxHtAdj})`)
    .attr('x1', 0)
    .attr('x2', d => xScale(d.upperLim) - xScale(d.quant75))
    .attr('y1', 10)
    .attr('y2', 10);

  // box plot line from lower to q25
  let boxPToLowerUpdate = svg.selectAll('.bp-linetolower')
    .data(boxPData)
    .attr('class', 'box-p bp-linetolower')
    .call(update => update.transition()
    .duration(visTransTime)
    .attr('transform', d =>`translate(${xScale(d.lowerLim)}, ${height*boxHtAdj})`)
    .attr('x2', d => xScale(d.quant25) - xScale(d.lowerLim))
  );

  let boxPToLowerEnter = boxPToLowerUpdate
    .enter().append('line')
    .attr('class', 'box-p bp-linetolower')
    .attr('transform', d =>`translate(${xScale(d.lowerLim)}, ${height*boxHtAdj})`)
    .attr('x1', 0)
    .attr('x2', d => xScale(d.quant25) - xScale(d.lowerLim))
    .attr('y1', 10)
    .attr('y2', 10);


  // box plot outliers
  let boxPOutliers = svg.selectAll('.bp-outl')
    .data(descStats.outliers)
    .attr('class', 'bp-outl')
    .attr('transform', d =>`translate(0, ${height * boxHtAdj})`)
    .attr('r', 0)
    .style('opacity', 0)
    .style('fill-opacity', 0)
    .attr('cx', d => xScale(d))
    .attr('cy', 10)
    .call(update => update.transition()
      .duration(visTransTime)
      .attr('r', 4)
      .style('opacity', 1) 
      .style('fill-opacity', 0.1) 
    );

  let boxPOutliersEnter = boxPOutliers
    .enter().append('circle')
    .attr('class', 'bp-outl')
    .attr('transform', d =>`translate(0, ${height * boxHtAdj})`)
    .attr('r', 0)
    .style('opacity', 0)
    .style('fill-opacity', 0)
    .attr('cx', d => xScale(d))
    .attr('cy', 10)
    .transition()
      .duration(visTransTime)
      .attr('r', 4)
      .style('opacity', 1) 
      .style('fill-opacity', 0.1);

  let boxPOutliersExit = boxPOutliers
    .exit()
    .attr('r', 4)
    .call(exit => exit.transition().duration(250)
      .attr('r', 0)
    )
    .remove();

  

  let xHistXAxis = d3.axisBottom(xScale).tickFormat(""); 
  let xHistYAxis = d3.axisLeft(yScale); 

  // add the x Axis
  svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .attr('class', 'histx-x axis');

  svg.select('.histx-x.axis')
    .transition()
    .duration(visTransTime)    
    .call(xHistXAxis);

  // add the y Axis
  svg.append("g")
    .attr('class', 'histx-y axis');

  svg.select('.histx-y.axis')    
    .transition()
    .duration(visTransTime)
    .call(xHistYAxis);

  svg.append('circle')
    .attr('r', 10)
    .attr('cx', -180)
    .attr('cy', 35)
    .style('fill', '#a44100')
    .style('fill-opacity', '0.2')
    .style('stroke', '#a44100')
    .style('stroke-width', '1px')
    .style('stroke-opacity', '0.7')  

  svg.append('text')
    .style("font", "25px arial")
    .attr("text-anchor", "start")
    .attr('dominant-baseline', 'middle')
    .attr("x", -160)
    .attr("y", 35)
    .text('Urban');


  svg.append('circle')
    .attr('r', 10)
    .attr('cx', -180)
    .attr('cy', 75)
    .style('fill', '#006954')
    .style('fill-opacity', '0.2')
    .style('stroke', '#006954')
    .style('stroke-width', '1px')
    .style('stroke-opacity', '0.7')    

    svg.append('text')
    .style("font", "25px arial")
    .attr("text-anchor", "start")
    .attr('dominant-baseline', 'middle')
    .attr("x", -160)
    .attr("y", 75)
    .text('Rural');  

} // end export default