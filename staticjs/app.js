d3.json("samples.json").then(function(data) {
      console.log(data);
 });

var data;

function init() {
    
  d3.json("samples.json").then(dataInit => {
    data = dataInit;

    var selection = dataInit.names;
    var selector = d3.select("#selDataset");

    selection.forEach(value => {
      selector
        .append("option")
        .text(value)
        .attr("value", function() {
          return value;
        });
    });
  });
}
  
d3.selectAll("#selDataset").on("change", updatePlotly); 

function updatePlotly() {

  var selectValue = d3.select("#selDataset").node().value;
     
    panelUpdate(selectValue);
    barChart(selectValue);
    bubbleChart(selectValue);
    gaugeChart(selectValue);

}

function panelUpdate(selectValue) {
  
  var filterData = data.metadata.filter(value => value.id == selectValue);

  var panel = d3.select(".panel-body");
  panel.html("");
  
  panel.append("p").text(`id: ${filterData[0].id}`);
  panel.append("p").text(`ethnicity: ${filterData[0].ethnicity}`);
  panel.append("p").text(`gender: ${filterData[0].gender}`);
  panel.append("p").text(`age: ${filterData[0].age}`);
  panel.append("p").text(`location: ${filterData[0].location}`);
  panel.append("p").text(`bbtype: ${filterData[0].bbtype}`);
  panel.append("p").text(`wfreq: ${filterData[0].wfreq}`);
}

function barChart(selectValue) {
  var filterBar = data.samples.filter(value => value.id == selectValue);
  var otuId = filterBar.map(value => value.otu_ids);
  var otuIdSlice = otuId[0].slice(0,10);

  var otuValues = filterBar.map(value => value.sample_values);
  var otuValueSlice = otuValues[0].slice(0,10);
  
  var otuLabels = filterBar.map(value => value.otu_labels);
  var otuLabelSlice = otuLabels[0].slice(0,10);
  
  var otuIdText = otuId[0].map(value => 'OTD ' + value);


  //console.log(filterBar);
  console.log(otuIdSlice);
  console.log(otuValueSlice);
  console.log(selectValue);
  console.log(otuLabelSlice);
  
  //Create a trace
  var trace = {
    x: otuValueSlice,
    y: otuIdText,
    text: otuLabelSlice,
    type: "bar",
    orientation: "h"
  };

  var layout = {
    yaxis: {
      autorange: 'reversed'
    },
   
  }

  var barData = [trace];

  Plotly.newPlot("bar", barData, layout);

}

function bubbleChart(selectValue) {
  
  var filterBar = data.samples.filter(value => value.id == selectValue);
  var sampleValues = filterBar.map(value => value.sample_values);
  var otuId = filterBar.map(value => value.otu_ids);
  var otuLabels = filterBar.map(value => value.otu_labels);
  
  var trace = {
    x:otuId[0],
    y:sampleValues[0],
    text:otuLabels[0],
    mode: 'markers',
    marker: {
      size: sampleValues[0],
      colorscale: 'Portland',
      color: otuId[0],
      }
  }
 
  var bubbleData = [trace]
  Plotly.newPlot("bubble",bubbleData)

}

function gaugeChart(selectValue) {
  var filterData = data.metadata.filter(value => value.id == selectValue);
  var weeklyFreq = filterData[0].wfreq;

 
  var degrees = 180 - (weeklyFreq*20),
       radius = .7;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  
  var path = 'M -.0 -0.0 L .0 0.025 L ',
            xPath = String(x),
            space = ' ',
            yPath = String(y),
            endPath = ' Z';
  var pathing = path.concat(xPath,space,yPath,endPath);
  console.log(path);

  var gaugeTrace = { 
    domain: {
      x: [0, 1], 
      y: [0, 1]},
    name: "speed",
    type: "indicator",
    mode: 'gauge+number',
    marker: {size: 20, color:'39FF14'},
    showlegend: false,
    text: weeklyFreq,
    hoverinfo: 'text+name',
    values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
    rotation: 90,
    text: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: 
      {colors:['#84B589','rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                           'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                           'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                           '#F4F1E4','#F8F3EC', 'rgba(255, 255, 255, 0)',]},
    labels: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false,
    
  };
  
  var layout = {
    width: 600,
    height: 500,
    margin: { t: 100, b: 0 },
    shapes:[{
        
        type: 'path',
        path: pathing,
        fillcolor: '39FF14',
        line: {
          color: '080808'
        },
  }],
    title: 'Belly Button Wash Frequency',
    xaxis: {visible: false, range: [-1, 1]},
    yaxis: {visible: false, range: [-1, 1]}

  };
  
  var gaugeData = [gaugeTrace];
  
  
  Plotly.newPlot('gauge', gaugeData, layout);

}

init();




  


      

