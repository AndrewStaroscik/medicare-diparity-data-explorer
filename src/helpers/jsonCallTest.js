import * as d3 from 'd3';
import soda from 'soda-js';

export default () => {

  d3.json("https://fusioncenter.nhit.org/resource/t4a3-z56z.json", function(error, data) {
    console.log(data);
});


var datCall = new soda.Consumer('fusioncenter.nhit.org');

datCall.query()
  .withDataset('t4a3-z56z')
  .limit(5)
  .where({ 'year': '2018' })
  .getRows()
    .on('success', function(rows) { console.log(rows); })
    .on('error', function(error) { console.error(error); });

fetch('https://fusioncenter.nhit.org/resource/t4a3-z56z.json')
   .then(response => response.json())
   .then( json => console.log(json))
   .catch( error => console.error(error))
}