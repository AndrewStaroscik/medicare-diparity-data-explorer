export default (gL, target) => {

  if (target == "x") {

  
    const measureSelectListenerA = document.querySelector('.option-select__measure-a');
    
    gL.el.conditionSelectA.length = 0;
    for (let cond in gL.dataOptions[measureSelectListenerA.value]) {
        var elA = document.createElement("option");
        elA.textContent = cond;
        elA.value = cond;
        gL.el.conditionSelectA.appendChild(elA);
    }
    gL.el.raceSelectA.length = 0;
    for (let race of gL.raceOptions) {
      var tmpEl = document.createElement("option");
      tmpEl.textContent = race;
      tmpEl.value = race;
      gL.el.raceSelectA.appendChild(tmpEl);
    }  
    gL.el.ageSelectA.length = 0;
    for (let age of gL.ageOptions) {
      var tmpEl = document.createElement("option");
      tmpEl.textContent = age;
      tmpEl.value = age;
      gL.el.ageSelectA.appendChild(tmpEl);
    }  
  } else {
    const measureSelectListenerB = document.querySelector('.option-select__measure-b');
    gL.el.conditionSelectB.length = 0;
    for (let cond in gL.dataOptions[measureSelectListenerB.value]) {
        var elB = document.createElement("option");
        elB.textContent = cond;
        elB.value = cond;
        gL.el.conditionSelectB.appendChild(elB);
    }
    
    gL.el.raceSelectB.length = 0;
    for (let race of gL.raceOptions) {
      var tmpEl = document.createElement("option");
      tmpEl.textContent = race;
      tmpEl.value = race;
      gL.el.raceSelectB.appendChild(tmpEl);
    }  
    
    gL.el.ageSelectB.length = 0;
    for (let age of gL.ageOptions) {
      var tmpEl = document.createElement("option");
      tmpEl.textContent = age;
      tmpEl.value = age;
      gL.el.ageSelectB.appendChild(tmpEl);
    }  
  }
}