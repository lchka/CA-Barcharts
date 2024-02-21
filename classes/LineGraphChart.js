//fix scaling, first loop is already the max, how to set the max from the array of cleanData, with the lowest value as first tick

class LineGraphChart {
  constructor(obj) {
    //canvas
    this.canvasWidth = obj.canvasWidth;
    this.canvasHeight = obj.canvasHeight;

    //CHART
    this.data = obj.data;
    this.chartWidth = obj.chartWidth;
    this.chartHeight = obj.chartHeight;
    this.xLinePos = obj.xLinePos;
    this.yLinePos = obj.yLinePos;
    this.axisLineColour = obj.axisLineColour;
    this.yValue = obj.yValue;
    this.pointEllipseSize = obj.pointEllipseSize;
    this.chartXYLineWeight = obj.chartXYLineWeight;

    //ticks
    this.numTicks = obj.numTicks;
    this.ticksTextSize = obj.ticksTextSize;
    this.tickStyle = obj.tickStyle;
    this.tickTextXPos = obj.tickTextXPos;
    this.ticksLength = obj.ticksLength;

    //TEXT x axis
    this.textSizeText = obj.textSizeText;
    this.textSizeColText = obj.textSizeColText;
    this.textRotate = obj.textRotate;
    this.xValue = obj.xValue;
    this.genFont = obj.genFont;
    this.fontBold = obj.fontBold;
    this.indiLineRotate = obj.indiLineRotate;
    this.indiLineWeight = obj.indiLineWeight;
    this.xAxisTextYPos = obj.xAxisTextYPos;
    this.indiLineHeight = obj.indiLineHeight;

    //subtext

    this.subLabel = obj.subLabel; //to pull the section name from the csv file
    this.textSubX = obj.textSubX;
    this.textSubY = obj.textSubY;
    this.subVertAlign = obj.subVertAlign;
    this.subHorzAlign = obj.subHorzAlign;
    this.textSizeSub = obj.textSizeSub;

    //text col y axis name

    this.colYAxisColour = obj.colYAxisColour;
    this.colYAxisSize = obj.colYAxisSize;
    this.colYAxisRotation = obj.colYAxisRotation;
    this.colYAxisStyle = obj.colYAxisStyle;
    this.colYAxisTextValue = obj.colYAxisTextValue;
    this.colYAxisTextX = obj.colYAxisTextX;
    this.colYAXisTextY = obj.colYAxisTextY;

    //text  for title
    this.textSizeTitle = obj.textSizeTitle;
    this.titleText = obj.titleText;
    this.textTitleX = obj.textTitleX;
    this.textTitleY = obj.textTitleY;
    this.titlePaddingX = obj.titlePaddingX;
    this.titleWeight = obj.titleWeight;
    this.titleVertAlign = obj.titleVertAlign;
    this.titleHorzAlign = obj.titleHorzAlign;

    //text for xLabel
    this.textYPosXLabel = obj.textYPosXLabel;
    this.textSizeXLabel = obj.textSizeXLabel;
    this.textXLabelRotate = obj.textXLabelRotate;
    this.horzAlignXLabel = obj.horzAlignXLabel;
    this.vertAlignXLabel = obj.vertAlignXLabel;

    //colors
    this.barFill = obj.barFill;
    this.textColour = obj.textColour;
    this.textTitleColour = obj.textTitleColour;
    this.bColour = obj.bColour;
    this.ticksValueColour = obj.ticksValueColour;
    this.pointsColour = obj.pointsColour;
    this.chartLineColour = obj.chartLineColour;
    this.chartLineIndiLineColour = obj.chartLineIndiLineColour;
    this.subTextColour = obj.subTextColour;
    this.textXLabelColour = obj.textXLabelColour;

    // Calculate maxValue and scale
    this.maxValue = max(this.data.map((d) => d[this.yValue])); // Get the max value from the yValue of the chart
    this.scale = this.chartHeight / this.maxValue; // Calculate the scale for the chart
  }

  render() {
    //creates the graphs lines
    push();
    translate(this.xLinePos, this.yLinePos);
    stroke(this.axisLineColour);
    strokeWeight(this.chartXYLineWeight);
    line(0, 0, 0, -this.chartHeight);
    line(0, 0, this.chartWidth, 0);

    //
    let yLabels = this.data.map((x) => x[this.yValue]); //text yLabel
    let xLabels = this.data.map((s) => s[this.xValue]); //text xLabel

    // Draw ticks on y-axis
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(0, i * (-this.chartHeight / this.numTicks));
      line(0, 0, this.ticksLength, 0);
      pop();
    }

    //  tick text
    let tickValue = this.maxValue / this.numTicks; //prevents it from going over the max of preset value in the column/rows. On first loop it did display the max value (453) but kept going over it, which is why we needed another variable that handles the 'gap difference' between each value label.
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(0, (i * -this.chartHeight) / this.numTicks); //chartheight is always in - as the original 0,0 is above the plus.
      noStroke();
      textSize(this.ticksTextSize);
      textFont(this.fontBold);
      fill(this.ticksValueColour);
      textAlign(RIGHT, CENTER);

      text(Math.ceil(i * tickValue), this.tickTextXPos, 0); //everytime it loops it adds from the previous loop to the current one, used math,ciel to round to the nearest whole number
      pop();
    }

    // Drawing chart lines and points

    let xStep = this.chartWidth / (this.data.length - 1); //350/11-1=35
    let xLine = 0; //will be responsible in moving from point a to point b
    let yStep = this.chartHeight / this.maxValue; //200/2843=0.0706
    beginShape();
    noFill();

    for (let i = 0; i < this.data.length; i++) {
      stroke(this.chartLineColour);
      let yLine = -this.data[i][this.yValue] * yStep; //yvalue is what we're displaying on the graph
      push();
      fill(this.pointsColour);
      noStroke();
      ellipse(xLine, yLine, this.pointEllipseSize);
      noFill();
      pop();

      // Text X AXIS
      push();
      noStroke();
      fill(this.textColour[i % this.textColour.length]);
      textSize(this.textSize);
      if (this.textRotate === 0) {
        textAlign(CENTER, CENTER);
      } else {
        textAlign(LEFT, CENTER);
      }


      
      //text for xLabel below graph line
      push();
      translate(xLine, this.textYPosXLabel);
      rotate(this.textXLabelRotate); // Rotate each xLabel text individually
      fill(this.textXLabelColour);
      textSize(this.textSizeXLabel);
      textFont(this.fontBold);
      textAlign(this.horzAlignXLabel, this.vertAlignXLabel);
      text(xLabels[i], 0, this.textYPosXLabel); 
      pop();



      // Draw the Indicator line alongside the text
      push();
      translate(xLine, yLine); // Move the origin to the position where the line starts
      stroke(
        this.chartLineIndiLineColour[i % this.chartLineIndiLineColour.length]
      );
      strokeWeight(2); //breaks indicator lines and they wont show when the property is passed
      rotate(-20);
      line(0, 0, 0, 35); //breaks indicator lines and they wont show when the property is passed
      pop();

      //text for yValue Labels
      textFont(this.fontBold);
      text(yLabels[i], xLine, yLine + this.xAxisTextYPos);
      vertex(xLine, yLine);
      xLine += xStep; //moves the point by taking the first loops value (e.g 2693) and adds the next value to that previous one, these two values are then added together and in the second loop iteration the next value is add.

      pop();
    }
    endShape();
    pop();

    //subtext
    push();
    noStroke();
    fill(this.subTextColour);
    textFont(this.fontBold);
    textAlign(this.subHorzAlign, this.subVertAlign);
    textSize(this.textSizeSub);
    text(this.subLabel, this.textSubX, this.textSubY);
    pop();

    // main for title each graph
    push();
    noStroke();
    fill(this.textTitleColour);
    textFont(this.fontBold);
    textSize(this.textSizeTitle);
    textStyle(this.titleWeight);
    textAlign(this.titleHorzAlign, this.titleVertAlign);
    text(this.titleText, this.textTitleX, -this.textTitleY, this.titlePaddingX);
    pop();

    pop();
  }
}
