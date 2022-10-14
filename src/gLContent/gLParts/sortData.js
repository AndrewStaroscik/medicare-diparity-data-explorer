
export default (gL) => {

  // // the return will be an object with 
  // // a property per measure in the measure array
  // // and then all of the other data options
  
  let returnObj = {};
  let conditionArray = [];
  
  for (let meas of gL.measures) {
    returnObj[meas] = {};

    for (let el of gL.dataSets) {
      conditionArray.push(el.c);
    }
  }

    conditionArray = [... new Set(conditionArray)]

    // now conditionArray is a list of uniques
    // the return object has a property for each measure
    for (let meas in returnObj) {
      if  (returnObj.hasOwnProperty(meas)) {
        // this will run for each property
        for (let cond of conditionArray) {
          let tempCondList = [];
          for (let i = 0; i < gL.dataSets.length; i += 1) {
            if (gL.dataSets[i].m == meas && gL.dataSets[i].c == cond) {
                 tempCondList.push(i);
            }    
          }
          if (tempCondList.length > 0) {
            returnObj[meas][cond] = tempCondList;
          }
        }
      }       
    }

    return returnObj;

}