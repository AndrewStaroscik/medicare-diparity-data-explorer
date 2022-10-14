import getData from './gLParts/getData';
import getMeasures from './gLParts/getMeasures';
import sortData from './gLParts/sortData';
import visParams from './gLParts/visParams';
import elLinks from './gLParts/gLElementLinks'

export default (gL) => {

  elLinks(gL);  

  gL.dataSets = getData();

  gL.measures = getMeasures(gL);

  gL.dataOptions = sortData(gL);

  // this is hardwired into the vis based on the 
  // parameters I chose to download
  gL.ageOptions = ['All', '<65'];
  gL.raceOptions = ["Black", "White"];

  gL.vis = visParams;

  gL.excludeZeros = 'no';

  gL.about = 'hidden';


}