export default (gL) => {

  let measuresArray = [];

  for (let series of gL.dataSets) {
    measuresArray.push(series.m);
  }

  return [... new Set(measuresArray)];

}