import * as d3 from 'd3';
import data01 from "../data/Prevalence_Diabetes_all_Black";
import data02 from "../data/Prevalence_Diabetes_all_White";
import data03 from "../data/Prevalence_Diabetes_lt65_Black";
import data04 from "../data/Prevalence_Diabetes_lt65_White";
import data05 from "../data/Prevalence_Obesity_all_Black";
import data06 from "../data/Prevalence_Obesity_all_White";
import data07 from "../data/Prevalence_Obesity_lt65_Black";
import data08 from "../data/Prevalence_Obesity_lt65_White";
import data09 from "../data/Average-total-cost_Obesity_all_Black";
import data10 from "../data/Average-total-cost_Obesity_all_White";
import data11 from "../data/Average-total-cost_Obesity_lt65_Black";
import data12 from "../data/Average-total-cost_Obesity_lt65_White";

export default () => {

  // this will need to be refactored once 
  // the d3.json call can be used to pull specific files from a list in a folder. 

  // first summarize the data: 
  const dataList = [
    data01,
    data02,
    data03,
    data04,
    data05,
    data06,
    data07,
    data08,
    data09,
    data10,
    data11,
    data12
  ];

  let conditionArray = [];
  let genderArray = [];
  let measureArray = [];
  let ageArray = [];
  let raceArray = [];

  for (let series of dataList) {
    conditionArray.push(series.c);
    genderArray.push(series.g);
    measureArray.push(series.m);
    ageArray.push(series.a);
    raceArray.push(series.r);
  }

  conditionArray = [... new Set(conditionArray)];
  genderArray = [... new Set(genderArray)];
  measureArray = [... new Set(measureArray)];
  ageArray = [... new Set(ageArray)];
  raceArray = [... new Set(raceArray)];

  let returnObj = {
    c: conditionArray,
    g: genderArray, 
    m: measureArray, 
    a: ageArray,
    r: raceArray
  };

  // I need to determine which conditions are in each measure

  let condInMeasures = {};

  for (let meas of returnObj.m) {
    let tempArry = [];
    for (let i = 0; i < dataList.length; i += 1) {
      if (dataList[i].m == meas) {
        tempArry.push(dataList[i].c);
      }
    }
    condInMeasures[meas] = tempArry;
  }

  returnObj.condInMeasures = condInMeasures;

  return returnObj; 

} // end of export function

