export default (gL) => {

  // no return needed, just adds a bunch of things to the gL object

  gL.el = {};

  // this identifies the main div and all of the option selects
  gL.el.mainFrame = document.getElementById('mainFrame')
  gL.el.histoDiv = document.getElementById('histoDiv')
  gL.el.optionsContainer = document.getElementById('options-container');
  gL.el.measureSelectA = document.getElementById('option-select__measure-a');
  gL.el.measureSelectB = document.getElementById('option-select__measure-b');
  gL.el.conditionSelectA = document.getElementById('option-select__condition-a');
  gL.el.conditionSelectB = document.getElementById('option-select__condition-b');
  gL.el.ageSelectA = document.getElementById('option-select__age-a');
  gL.el.ageSelectB = document.getElementById('option-select__age-b');
  gL.el.raceSelectA = document.getElementById('option-select__race-a');
  gL.el.raceSelectB = document.getElementById('option-select__race-b');

} 