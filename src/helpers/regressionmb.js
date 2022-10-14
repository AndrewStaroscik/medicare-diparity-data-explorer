import * as ss from 'simple-statistics';


export default (data) => {
  
  // make the arrays needed to do the linear regression
  let xArray = [];
  let yArray = [];
  let ptsArray = [];

  for (let pt of data) {

    //if (Number(pt.x) != 0 && Number(pt.y) != 0) {
      xArray.push(Number(pt.x));
      yArray.push(Number(pt.y));
      ptsArray.push([Number(pt.x), Number(pt.y)])
    //}
  }
  
  return ss.linearRegression(ptsArray);

}