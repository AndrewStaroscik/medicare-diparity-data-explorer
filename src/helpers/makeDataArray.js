export default (x, y) => {

  let returnArray = [];
  
  let xCounties = [];
  let yCounties = [];

  for (let county of x.byCounty) {
    xCounties.push(county.f);
  }

  for (let county of y.byCounty) {
    yCounties.push(county.f);
  }

  let commonCounties = [];
  let xCountiesOnly = [];
  let yCountiesOnly = [];

  commonCounties = xCounties.filter(value => yCounties.includes(value));
  xCountiesOnly = xCounties.filter(value => !yCounties.includes(value));
  yCountiesOnly = yCounties.filter(value => !xCounties.includes(value));

  // I have an array of fis values that are in both x and y data 
  // need to create an array of objects 

  for (let county of commonCounties) {
    const xVal = x.byCounty.find(el => {return el.f == county});
    const yVal = y.byCounty.find(el => {return el.f == county});


    if (Number(xVal.v) !== 0 && Number(yVal.v) !== 0) {
      returnArray.push({f:county, 
        x: xVal.v, 
        y:yVal.v,
        cn: yVal.cn,
        s: yVal.s,
        u: yVal.u
      })

    }
  }
  
  return returnArray;
}