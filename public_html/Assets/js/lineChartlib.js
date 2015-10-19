/*  -------------------------------------------------------------------------   */
/**
 * Method used to get data and styles from Json files.
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */
function getDataandStyle() {
    var chartData = $.Deferred();
    var chartStyle = $.Deferred();
    var parsedData, parsedStyle;
    $.getJSON("json/data.json", function (data) {
        parsedData = data;
        chartData.resolve();
    })
    $.getJSON("json/linechart.json", function (data) {
        parsedStyle = data;
        chartStyle.resolve();
    })
    var nessecaryData = $.when(chartData, chartStyle).done(function () {
        chartparams =
                {
                    'data': parsedData,
                    'style': parsedStyle
                };
        var charthandler = new linechart(chartparams);
        charthandler.render();
    });
}
getDataandStyle();
/*  -------------------------------------------------------------------------   */
/**
 * Method used to initialize variables.
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */
function linechart(chartparams) {

    this.parsedData = chartparams.data;
    this.parsedStyle = chartparams.style;
    this.margin = {top: 20,bottom:40, left: 80, right: 90};

    //Defining styles for value axis
    var valueAxisStyle = this.parsedStyle.Axis.valueAxis;
    this.valueAxisColor = valueAxisStyle.color;
    this.valueAxisFontSize = valueAxisStyle.fontSize;
    this.valueAxisShowAxis = valueAxisStyle.showAxis;
    this.valueAxisStrokeColor = valueAxisStyle.strokeColor;
    this.valueAxisStrokeWeight = valueAxisStyle.weight;
    this.valueAxistittle = valueAxisStyle.tittle;
    this.valueAxisFontFamily = valueAxisStyle.fontFamily;

    //Defining styles for category axis
   var categoryAxisStyle = this.parsedStyle.Axis.categoryAxis;
    this.categoryAxisColor = categoryAxisStyle.color;
    this.categoryAxisFontSize = categoryAxisStyle.fontSize;
    this.categoryAxisShowAxis = categoryAxisStyle.showAxis;
    this.categoryAxisStrokeColor = categoryAxisStyle.strokeColor;
    this.categoryAxisStrokeWeight = categoryAxisStyle.weight;
    this.categoryAxistittle = categoryAxisStyle.tittle;
    this.categoryAxisFontFamily = categoryAxisStyle.fontFamily;
    //Defining seriesData Styles
    this.seriesData = this.parsedStyle.SeriesStyles;

    //Defining styles for charting Area
    var chartingAreaStyle = this.parsedStyle.chartingAreaStyle;
    this.chartingAreaBackgroundColor = chartingAreaStyle.backgroundColor;
    this.chartingAreaBorderColor = chartingAreaStyle.borderColor;
    this.chartingAreaBorderThickness = chartingAreaStyle.borderThickness;
    this.chartingAreaXPosition = chartingAreaStyle.chartComponentPositionX;
    this.chartingAreaYPosition = chartingAreaStyle.chartComponentPositionY;
    this.chartingAreaIsVisible = chartingAreaStyle.chartComponentIsVisible;
    this.chartingAreaHeight = chartingAreaStyle.chartComponentHeight;
    this.chartingAreaWidth = chartingAreaStyle.chartComponentWidth;

    //Defining grid line style
    var gridLineStyle = this.parsedStyle.gridStyle;
    this.horizontalLineStrokeColor = gridLineStyle.hLineStrokecolor;
    this.horizontalLineThickness = gridLineStyle.hLineThickness;
    this.IsGridLineVisible = gridLineStyle.isGridlineVisible;
    this.verticalLineStrokeColor = gridLineStyle.vLineStrokeColor;
    this.verticalLineThickness = gridLineStyle.vLineThickness;

    //Defining legend styles
    var legendStyles = this.parsedStyle.legendStyles;
    this.chartLegendFontSize = legendStyles.fontSize;
    this.chartLegendFontFamily = legendStyles.fontFamily;
    this.chartLegendFontStyle = legendStyles.fontStyle;
    this.chartLegendFontWeight = legendStyles.fontWeight;

    //Defining circle styles
    var circleStyle = this.parsedStyle.circleStyles;
    this.circlestrokewidth = circleStyle.circlestrokewidth;
    this.circlebackgroundcolor = circleStyle.circlebackgroundcolor;
    this.circleradius = circleStyle.circleradius;

// this.originalData = $.extend(true, [], this.parsedData.Data);
//    this.axisFlag = false;
//    this.saveClick = false;
//    this.originalData = this.addingAttribute(this.originalData);
//    handlingSeriesColors(this);
    this.spliceData();
}

/*  -------------------------------------------------------------------------   */
/**
 * Method used to define scales and values required for the chart.
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */

linechart.prototype.spliceData = function () {
    var that = this;
    that.finalGraphData = this.parsedData;
    console.log(that.finalGraphData["Data"][0]);
    that.xScale = d3.scale.ordinal();
    that.yScale = d3.scale.linear();
    var valueArray=[];
    $.each(that.finalGraphData.Data, function (key, value) {
        $.each(value.data, function (k, v) {
            valueArray.push(v.value);
            valueArray.push(v.value);
        })
    })
that.valueAxisMinVal=d3.min(valueArray)
that.valueAxisMaxVal=d3.max(valueArray)
    if (that.valueAxisMinVal > 0) {
        that.valueAxisMinVal = 0;
    }
//    if (!that.legendsClick) {
//        calculateMargin(that);
//        calculateLegendHeight(that);
//    }
//    that.legendHeight = calculateLegendHeight(that);
console.log(that.margin.bottom);
    //that.margin.bottom = that.margin.bottom + that.legendHeight;
    that.actualChartingAreaWidth = that.chartingAreaWidth;
    that.actualChartingAreaHeight = that.chartingAreaHeight;
    /*  calculate the svg height and width  */
     that.width = that.actualChartingAreaWidth - that.margin.right;
    that.height = that.actualChartingAreaHeight - that.margin.bottom-that.margin.top;
    
    /*  defining the scale for x-axis  */
   
    /*  setting the domain for x-axis and y-axis */
 that.x=   that.xScale.domain(that.finalGraphData["Data"][0].data.map(function (d, i) {
        return d.label;
    })).rangeRoundBands([0, that.width], 0.2);
that.y=    that.yScale.domain([that.valueAxisMinVal, that.valueAxisMaxVal])
            .range([that.height,0])
}

/*  -------------------------------------------------------------------------   */
/**
 * Method used to render the chart.
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */

linechart.prototype.render=function(){
    var that=this;
    that.chartingAreaStyle(that);
    that.ActualchartArea(that);
//   that.renderLegend(that);
   that.renderValueAxis(that);
   that.renderLabelAxis(that);
   that.renderDataPoints(that);
 that.renderPath(that);
   
}
/*  -------------------------------------------------------------------------   */
/**
 * Method used to make the chart styling.
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */

linechart.prototype.chartingAreaStyle = function (that) {
    /*  styling the charting area/graph container  */
    d3.select('.chart').style({
        'background-color': that.chartingAreaBackgroundColor,
        'height': that.chartingAreaHeight + "px",
        'width': that.chartingAreaWidth + "px",
        'border': that.chartingAreaBorderThickness + "px solid " + that.chartingAreaBorderColor,
        'left': that.chartingAreaXPosition + "px",
        'top': that.chartingAreaYPosition + "px",
        'overflow': 'hidden',
        'position': 'absolute'
    });
}
/*  -------------------------------------------------------------------------   */
/**
 * Method used to append and apply styles for the actual charting area.
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */
linechart.prototype.ActualchartArea = function (that) {
    that.actualChartArea = d3.select('.chart').append("div").classed("actualChartPane", true).style({
        'background-color': function () {
            return that.chartingAreaBackgroundColor;
        },
        'height': that.chartingAreaHeight + "px",
        'width': that.chartingAreaWidth + "px",
        'border': that.chartingAreaBorderThickness + "px solid " + that.chartingAreaBorderColor,
    })

    that.svg = that.actualChartArea.append("svg")
            .attr("width", that.actualChartingAreaWidth)
            .attr("height", that.actualChartingAreaHeight);

    /*  append a svg element */
    that.svg = that.svg.append("g").attr('class', 'tool').attr("transform", function (d) {
            return "translate(" + that.margin.left + "," + that.margin.top + ")";  
    });

}
/*  -------------------------------------------------------------------------   */
/**
 * Method used to render value axis.
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */
linechart.prototype.renderLabelAxis = function (that) {
    var valueAxis = d3.svg.axis()
            .scale(that.xScale)
            .orient("bottom");
//            .innerTickSize(-that.actualChartingAreaHeight)
//            .outerTickSize(0)
//            .tickPadding(10);
    that.svg.append("g")
            .attr("class", "valueAxis")
    that.svg.append("g")
            .attr("class", "valueAxis")
            .attr("transform", "translate(0," + (parseInt(that.height) - parseInt(that.valueAxisStrokeWeight) / 2) + ")")
            .attr("fill", "none")
            .attr("stroke", that.valueAxisStrokeColor)
            .attr("stroke-width", that.valueAxisStrokeWeight)
            .style("color", that.valueAxisColor)
            .call(valueAxis)
            .append("text")
            .attr("class", "xaxis-title")
            .attr("x", that.actualChartingAreaWidth / 2 - 80)
            .attr("y", that.actualChartingAreaHeight / 10)
            .style("text-anchor", "middle")
            .style("stroke", "green")
            .text(that.valueAxistittle);
}

/*  -------------------------------------------------------------------------   */
/**
 * Method used to render Label Axis.
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */

linechart.prototype.renderValueAxis = function (that) {
    var categoryAxis = d3.svg.axis()
            .scale(that.yScale)
            .orient("left")

    that.svg.append("g")
            .attr("class", "labelAxis")
            .attr("fill", "none")
            .attr("stroke", that.categoryAxisStrokeColor)
            .attr("stroke-width", that.categoryAxisStrokeWidth)
            .style("color", that.categoryAxisColor)
            .call(categoryAxis)
            .append("text")
            .attr("class", "yaxis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - that.margin.left)
            .attr("x", 0 - (that.actualChartingAreaHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("stroke", "green")
            .text(that.categoryAxistittle);

}
/*  -------------------------------------------------------------------------   */
/**
 * Method used to render datapoints.
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */
linechart.prototype.renderDataPoints = function (that){
    var lineData = [];
   $.each(that.finalGraphData.Data,function(key,value){
       lineData = value.data;
       var datapoints=that.svg.selectAll("circle")
                        .data(lineData)
                        .enter()
                        .append("circle")
                        .attr("cy",function(d){
                            return that.y(d.value);
                         }).attr("cx",function(d){
                              return that.x(d.label);
                         }).attr("r",that.circleradius)
                          .attr("stroke","green")
                          .attr("fill","blue")
                          .attr("stroke-width",that.circlestrokewidth);
   
   });
  
};
/*  -------------------------------------------------------------------------   */
/**
 * Method used to render dataline
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */
linechart.prototype.renderPath=function(that){
    var pathLine=[];
    $.each(that.finalGraphData.Data,function(key,value){
        pathLine=value.data;
        console.log(pathLine);
        var drawline=d3.svg.line()
                .y(function(d){
        return that.y(d.value)            
        
    })
            .x(function(d){
                return that.x(d.label)
    })

    var path=that.svg.append("path")
            .attr("d",drawline(pathLine))
            .attr("stroke","red")
            .attr("stroke-width","3")
            .attr("fill","none");
        })
}