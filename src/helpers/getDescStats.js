import * as ss from 'simple-statistics';


export default (data, param) => {

  let testData = data.map(el => Number(el[param]));

  let ssMean = Math.round(ss.mean(testData)*100)/100;
  let ssMedian = Math.round(ss.median(testData)*100)/100;
  let ssStdDev = Math.round(ss.standardDeviation(testData)*100)/100;
  let ssMin = Math.round(ss.min(testData)*100)/100;
  let ssMax = Math.round(ss.max(testData)*100)/100;
  let ssQuantile = {};

  ssQuantile.twentyFive = Math.round(ss.quantile(testData, 0.25)*100)/100;
  ssQuantile.seventyFive = Math.round(ss.quantile(testData, 0.75)*100)/100;

  let ssIQR = ssQuantile.seventyFive - ssQuantile.twentyFive;
  let ssLowerLim = ssQuantile.twentyFive - ssMin <= 1.5 * ssIQR ? ssMin : ssQuantile.twentyFive - 1.5 * ssIQR;
  let ssUpperLim = ssMax - ssQuantile.seventyFive <= 1.5 * ssIQR ? ssMax : ssQuantile.seventyFive + 1.5 * ssIQR;

  let ssOutliers = testData.filter(x => (x < ssLowerLim || x > ssUpperLim));

  return {
    mean: ssMean,
    min: ssMin,
    max: ssMax,
    median: ssMedian,
    quant25: ssQuantile.twentyFive,
    quant75: ssQuantile.seventyFive,
    iqr: ssIQR,
    lowerLim: ssLowerLim,
    upperLim: ssUpperLim,
    outliers: ssOutliers
  }


}