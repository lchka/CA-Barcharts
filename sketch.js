// import { StackedBarchart } from './stackedBarchart.js';
let barCharts = [];
let data;
let cleanData = [];
let numRows;
let font;
let boldText;
function preload() {
  data = loadTable("data/FatalCrashes.csv", "csv", "header");
  font=loadFont('Fonts/Inter-Regular.ttf');
  boldText=loadFont('Fonts/Inter-SemiBold.ttf');
}

function setup() {
  background(50);
  createCanvas(1600, 750);
  angleMode(DEGREES);

  //cleans data
  console.log(data);
  numRows = data.rows.length;
  for (let i = 0; i < numRows; i++) {
    cleanData.push(data.rows[i].obj);
  }
  console.log(cleanData);

  //giving the properties values

  let barChart = {
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xPos: 60,
    yPos: 650,
    barWidth: 25,
    genFont:font,
    fontBold:boldText,

    //colours
    barFill: ["#F7BDD1", "#F59EBB", "#F17CA3"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",

    //text for X AXIS
    textColour: "#0f0000",
    textRotate: 45,
    textSizeText: 13 ,

    //text for col y axis name

    colYAxisColour:"#C72A2A",
    colYAxisSize:16,
    colYAxisRotation:-90,
    colYAxisStyle:BOLD,
    colYAxisTextValue:"no. of deaths",
    colYAxisTextX:50,
    colYAxisTextY:-40,

    //text for col
    textSizeColText: 16,
    colLabel: "accidents per year",
    textColY: 60,
    textColX: 180,
    textColWeight: BOLD,
    colVertAlign:CENTER,
    colHorzAlign:CENTER,

    //text for title
    textSizeTitle: 24,
    titleText: "Fatal driving accidents resulting from the use of mobile devices",
    textTitleX: -25,
    textTitleY: 270,
    titlePaddingX: 400,
    titleWeight: BOLD,
    titleHorzAlign:CENTER,
    titleVertAlign:CENTER,

    //tick and tick text
    numTicks: 10,
    ticksTextSize: 13,
    tickStyle: BOLD,

    //values
    yValue: "cell-usage",
    xValue: "Year",
  };

  let lineChart = {
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xPos: -5,
    yPos: -350,
    barWidth: 25,
    genFont:font,
    fontBold:boldText,

    //colours
    barFill: ["#F7BDD1", "#F59EBB", "#F17CA3"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",

    //text for X AXIS
    textColour: "#0f0000",
    textRotate: 45,
    textSizeText: 13 ,

    //text for col y axis name

    colYAxisColour:"#C72A2A",
    colYAxisSize:16,
    colYAxisRotation:-90,
    colYAxisStyle:BOLD,
    colYAxisTextValue:"no. of deaths",
    colYAxisTextX:50,
    colYAxisTextY:-40,

    //text for col
    textSizeColText: 16,
    colLabel: "accidents per year",
    textColY: -20,
    textColX: 180,
    textColWeight: BOLD,
    colVertAlign:CENTER,
    colHorzAlign:CENTER,

    //text for title
    textSizeTitle: 24,
    titleText: "Fatal driving accidents resulting from the use of mobile devices",
    textTitleX: -25,
    textTitleY: 270,
    titlePaddingX: 400,
    titleWeight: BOLD,
    titleHorzAlign:CENTER,
    titleVertAlign:CENTER,

    //tick and tick text
    numTicks: 10,
    ticksTextSize: 13,
    tickStyle: BOLD,

    //values
    yValue: "cell-usage",
    xValue: "Year",
  };
  barCharts.push(new BarChart(barChart))

  barCharts.push(new LineGraphChart(lineChart))  

}

function draw() {
  background(171, 171, 188);
  barCharts.forEach((bar) => bar.render());
}
