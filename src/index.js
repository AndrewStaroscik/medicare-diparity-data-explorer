import './styles/main.styl';

import * as d3 from 'd3';

import gL from './gLContent/gL';
import populategL from './gLContent/populategL';

import setOptions from './helpers/setOptions';
import makeVis from './helpers/makeVis';
import makeHist from './helpers/makeHist';
import makeHistY from './helpers/makeHistY';
import aboutToggle from './helpers/aboutToggle';

// from this answer: 
// https://stackoverflow.com/a/9895164/1112097

populategL(gL);

for(var option of gL.measures) {
  var elA = document.createElement("option");
  elA.textContent = option;
  elA.value = option;
  gL.el.measureSelectA.appendChild(elA);
  
  var elB = document.createElement("option");
  elB.textContent = option;
  elB.value = option;
  gL.el.measureSelectB.appendChild(elB);

}

// set the first two series to chart
gL.seriesA = gL.dataSets[6];
gL.seriesB = gL.dataSets[1];

// set the measures based on the initial series defined above
document.getElementById('option-select__measure-a').value = gL.seriesA.m
document.getElementById('option-select__measure-b').value = gL.seriesB.m

setOptions(gL, 'x');
setOptions(gL, 'y');

document.getElementById('about-button').addEventListener('click', aboutToggle);
document.getElementById('about-close').addEventListener('click', aboutToggle);

// create vis area as part of gL
gL.svgVisParent = d3.select('#mainFrame').append('svg')
  .attr('width', gL.vis.totalWidth + (gL.vis.totalWidth/3))
  .attr('height', gL.vis.totalHeight);

gL.svgVis = gL.svgVisParent  
  .append('g')
  .attr('transform', `translate(${gL.vis.margin.left + (gL.vis.totalWidth/3)},${gL.vis.margin.top})`);

gL.yHistoG = gL.svgVisParent
  .append('g')
  .attr('id', '#yhist')
  .attr('transform', `translate(${gL.vis.margin.left},${gL.vis.totalHeight + gL.vis.margin.top - gL.vis.margin.left})rotate(-90)`);  

gL.tooltip = d3.select("#mainFrame").append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0);

gL.svgHist = d3.select('#histodiv').append('svg')
  .attr('width', gL.vis.totalWidth + (gL.vis.totalWidth/3))
  .attr('height', gL.vis.totalHeight/3)
  .append('g')
  .attr('transform', `translate(${gL.vis.margin.left + (gL.vis.totalWidth/3)},${gL.vis.margin.top})`);

gL.histoTooltip = d3.select("#histodiv").append("div")	
  .attr("class", "histotooltip")				
  .style("opacity", 0);


syncSelects({type: 'none'})  
makeVis(gL);
makeHist(gL);
makeHistY(gL);


const selects = document.querySelectorAll('.option-select');

selects.forEach(select => {
  select.addEventListener('change', syncSelects);
}); 

function syncSelects(e) {

  
  // get all of the selector values
  let measureA = document.getElementById('option-select__measure-a').value;
  let conditionA = document.getElementById('option-select__condition-a').value;
  let raceA = document.getElementById('option-select__race-a').value;
  let ageA = document.getElementById('option-select__age-a').value;

  let measureB = document.getElementById('option-select__measure-b').value;
  let conditionB = document.getElementById('option-select__condition-b').value;
  let raceB = document.getElementById('option-select__race-b').value;
  let ageB = document.getElementById('option-select__age-b').value;



  if (e.type == 'change') {

    if (e.target.name == 'measure-a') {
      setOptions(gL, 'x');

      // check to see of current condition is still an option
      let newOptsA = (Array.from(document.querySelectorAll('#option-select__condition-a option')).map(x => x.value));
      if (newOptsA.includes(conditionA)) {
        document.getElementById('option-select__condition-a').value = conditionA;
      } else {
        document.getElementById('option-select__condition-a').value = newOptsA[0]; 
        conditionA = newOptsA[0]; 
      }
    } else if (e.target.name == 'measure-b') {
      setOptions(gL, 'y');
      // check to see of current condition is still an option
      let newOptsB = (Array.from(document.querySelectorAll('#option-select__condition-b option')).map(x => x.value));
      if (newOptsB.includes(conditionB)) {
        document.getElementById('option-select__condition-b').value = conditionB;
      } else {
        document.getElementById('option-select__condition-b').value = newOptsB[0]; 
        conditionB = newOptsB[0]; 
      }
    } else if (e.target.name == 'condition-a') {
      conditionA = document.getElementById('option-select__condition-a').value;
    } else if (e.target.name == 'condition-b') {
      conditionB = document.getElementById('option-select__condition-b').value;
    } else if (e.target.name == 'race-a') {
      raceA = document.getElementById('option-select__race-a').value;
    } else if (e.target.name == 'race-b') {
      raceB = document.getElementById('option-select__race-b').value;
    } else if (e.target.name == 'age-a') {
      ageA = document.getElementById('option-select__age-a').value;
    } else if (e.target.name == 'age-b') {
      ageB = document.getElementById('option-select__age-b').value;
    } else {
    
      // should never get here??

    }
  } else {
    // new load - find data based on settings which should be set at start of the function
    document.getElementById('option-select__condition-a').value = 'Obesity';
    conditionA = document.getElementById('option-select__condition-a').value;
  }


  // set all of the selector values
  document.getElementById('option-select__measure-a').value = measureA;
  document.getElementById('option-select__condition-a').value = conditionA;
  document.getElementById('option-select__race-a').value = raceA;
  document.getElementById('option-select__age-a').value = ageA;

  document.getElementById('option-select__measure-b').value = measureB;
  document.getElementById('option-select__condition-b').value = conditionB;
  document.getElementById('option-select__race-b').value = raceB;
  document.getElementById('option-select__age-b').value = ageB;

  // HACK there is a better way to do this, instead of going through it once for A and then once for B
  for (let i = 0; i < gL.dataSets.length; i += 1) {
    let d = gL.dataSets[i];
    if (
      d.m == measureA && 
      d.c == conditionA &&
      d.r == raceA &&
      d.a == ageA
    ) {
      gL.seriesA = d;
      break;
    }
  }
  for (let i = 0; i < gL.dataSets.length; i += 1) {
    let d = gL.dataSets[i];
    if (
      d.m == measureB && 
      d.c == conditionB &&
      d.r == raceB &&
      d.a == ageB
    ) {
      gL.seriesB = d;
      break;
    }
  }


  makeVis(gL); 
  makeHist(gL);
  makeHistY(gL);
}








