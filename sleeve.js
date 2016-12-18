////////////////////////////////////////////////////////
//
// Based on http://microsoft.github.io/maker.js/
//
// Modelled by Kurt Meister | 2016-12-03
//
// ToDo:
// - Calculate lenght and width of of the sleeve according to phone dimensions
//
// - Replace myFix, myRibbonFix and path by stiched holes
//
////////////////////////////////////////////////////////

var makerjs = require('makerjs');

// Mobilephone
var lenght = 147;
var width = 72.6;
var thickness = 7.9;
var radius = 10;

// Sleeve
var ribbon = 20;
var padding = 6; // ...
var offset = 2; // Seam offset
var stich = 3; // Distance between holes
var slot = 1; // Traverse ribbon trough
var slotX = 20; // Distance from left
var fixX = 40; // Distance from right
var needle = 0.2; // Hole dia

var layout = 1; // Place ribbon under sleeve

lenght = lenght+padding;
width = width+2*padding;

if(layout == 1) {
  var place = width/2 + ribbon/2 + radius/2 + 2;
}else{
  var place = 0;
};

// Geometry
this.models = {
  // Sleeve
  myRoundRectangle: new makerjs.models.RoundRectangle(lenght, width, radius),
  mySlot: makerjs.model.move(new makerjs.models.RoundRectangle(slot, ribbon+1, slot/2),[slotX-slot/2, width/2-(ribbon+1)/2]),
  //myFix: makerjs.model.move(new makerjs.models.Rectangle(ribbon, ribbon-2*offset),[lenght-fixX, width/2-(ribbon-2*offset)/2]),
  // Ribbon
  myRibbon: new makerjs.model.move(new makerjs.models.RoundRectangle(lenght+fixX-ribbon/2, ribbon, offset),[slotX-offset, width/2-(ribbon/2)+place]),
  //MyRibbonFix: makerjs.model.move(new makerjs.models.Rectangle(ribbon*1.5, ribbon-2*offset),[lenght+fixX-ribbon-2*offset, width/2-(ribbon-2*offset)/2+place]),
  myHandle: new makerjs.model.move(new makerjs.models.RoundRectangle(ribbon, ribbon+radius, offset),[0, width/2-ribbon/2-radius/2+place]),
};

this.paths = {
  line1: new makerjs.paths.Line([radius, offset], [lenght-radius, offset]),
  arc1: new makerjs.paths.Arc([lenght-radius, radius], radius-offset, 270, 0),
  line2: new makerjs.paths.Line([lenght-offset, radius], [lenght-offset, width-radius]),
  arc2: new makerjs.paths.Arc([lenght-radius, width-radius], radius-offset, 0, 90),
  line3: new makerjs.paths.Line([lenght-radius, width-offset], [radius, width-offset]),

  myRbLine1: new makerjs.paths.Line([lenght-fixX, width/2-ribbon/2+offset+place], [lenght-fixX+ribbon, width/2-ribbon/2+offset+place]),
  myRbLine2: new makerjs.paths.Line([lenght-fixX, width/2+ribbon/2-offset+place], [lenght-fixX+ribbon, width/2+ribbon/2-offset+place]),
  myRbLine3: new makerjs.paths.Line([lenght+fixX-ribbon-2*offset, width/2-ribbon/2+offset+place], [lenght+fixX-2*offset+0.5*ribbon, width/2-ribbon/2+offset+place]),
  myRbLine4: new makerjs.paths.Line([lenght+fixX-ribbon-2*offset, width/2+ribbon/2-offset+place], [lenght+fixX-2*offset+0.5*ribbon, width/2+ribbon/2-offset+place]),

  //myCircle: new makerjs.model.move(new makerjs.paths.Circle([0, 0], needle),[radius, offset]),

};

makerjs.model.combine(models.myHandle, models.myRibbon, false, true, false, true);


this.notes = '# Welcome to the SleeveMaker Factory \n Description and customisation with sliders tbd...';


/*Sleeve.metaParameters = [
    { title: "lenght", type: "range", min: 100, max: 200, step: 1, value: 140 },
    { title: "width", type: "range", min: 50, max: 100, step: 1, value: 70 },
    { title: "thickness", type: "range", min: 4, max: 20, step: .5, value: 7 },
    { title: "radius", type: "range", min: 3, max: 15, value: 8 }

];*/

//press enter here to add more blank lines
