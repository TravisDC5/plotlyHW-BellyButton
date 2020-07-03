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
  //console.log(otuIdSlice);
  //console.log(otuValueSlice);
  //console.log(selectValue);
  //console.log(otuLabelSlice);
  
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
  var wfreq = filterData[0].wfreq;

  var gaugeTrace = { 
      type: 'pie',
      showlegend: false,
      hole: 0.4,
      rotation: 90,
       
      values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],           
      text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      direction: 'clockwise',
      textinfo: 'text',
      textposition: 'inside',    
      marker: {
          colors: ['#F8F3EC','#F4F1E5','#E9E6CA','#E2E4B1','#D5E49D','#B7CC92','#8CBF88','#8ABB8F','#85B48A','white'],
          labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
          hoverinfo: "label"
        },
        hoverinfo: "skip"
      }
                      
      var dot = {
          type: 'scatter',
          x: [0],
          y: [0],
          marker: {
            size: 14,
            color:'39ff14'
          },
          showlegend: false,
          hoverinfo: "skip",
          line: {
            color: '080808'
          }
      }    
      
      var weight = 0;
      if (wfreq == 0){
          weight = 3;
      } else if (wfreq == 1 || wfreq == 2 || wfreq == 3){
          weight = 3;
      } else if (wfreq == 4){
          weight = 2;
      } else if (wfreq == 5){
          weight = -.5;
      } else if (wfreq == 6){
          weight = -2;
      } else if (wfreq == 7){
          weight = -3;
      }
      
      var degrees = 180-(20 * wfreq + weight);
      var radius = .5;
      var radians = degrees * Math.PI / 180;
      var aX = 0.025 * Math.cos((radians) * Math.PI / 180);
      var aY = 0.025 * Math.sin((radians) * Math.PI / 180);
      var bX = -0.025 * Math.cos((radians) * Math.PI / 180);
      var bY = -0.025 * Math.sin((radians) * Math.PI / 180);
      var cX = radius * Math.cos(radians);
      var cY = radius * Math.sin(radians);

      
      var    aXpath = String(aX);
      var    aYpath = String(aY);
      var    bXpath = String(bX);
      var    bYpath = String(bY);    
      var    cXpath = String(cX);
      var    cYpath = String(cY);
      
      var path = 'M ' + aXpath + ' ' + aYpath + ' L ' +
                        bXpath + ' ' + bYpath + ' L ' +      
                        cXpath + ' ' + cYpath + ' Z';
          
          console.log(path);

      var gaugeLayout = {
          title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
          shapes:[{
              type: 'path',
              path: path,
              fillcolor: '39ff14',
              line: {
                color: '080808'
              }
            }],
          xaxis: {zeroline:false, 
                  showticklabels:false,
                  showgrid: false, 
                  range: [-1, 1],
                  fixedrange: true
                },
          yaxis: {zeroline:false, 
                  showticklabels:false,
                  showgrid: false, 
                  range: [-1, 1],
                  fixedrange: true
                }
        };
        
        Plotly.newPlot("gauge", [gaugeTrace, dot], gaugeLayout);
  }
// function gaugeChart(selectValue) {

//   var filterData = data.metadata.filter(value => value.id == selectValue);
//   var wfreq = filterData[0].wfreq;

//   var gaugeTrace = { 
//       type: 'pie',
//       showlegend: false,
//       hole: 0.4,
//       rotation: 90,
       
//       values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],           
//       text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
//       direction: 'clockwise',
//       textinfo: 'text',
//       textposition: 'inside',    
//       marker: {
//           colors: ['#F8F3EC','#F4F1E5','#E9E6CA','#E2E4B1','#D5E49D','#B7CC92','#8CBF88','#8ABB8F','#85B48A','white'],
//           labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
//           hoverinfo: "label"
//         },
//         hoverinfo: "skip"
//       }
                      
//       var dot = {
//           type: 'scatter',
//           x: [0],
//           y: [0],
//           marker: {
//             size: 14,
//             color:'#850000'
//           },
//           showlegend: false,
//           hoverinfo: "skip"
//       }    
      
//       var weight = 0;
//       if (wfreq == 2 || wfreq == 3){
//           weight = 3;
//       } else if (wfreq == 4){
//           weight = 1;
//       } else if (wfreq == 5){
//           weight = -.5;
//       } else if (wfreq == 6){
//           weight = -2;
//       } else if (wfreq == 7){
//           weight = -3;
//       }
      
//       var degrees = 180-(20 * wfreq + weight);
//       var radius = .5;
//       var radians = degrees * Math.PI / 180;
//       var x = radius * Math.cos(radians);
//       var y = radius * Math.sin(radians);

//       var path = 'M .25 .25 L -.25 -.25 L',
//           xPath = String(x),
//           space = ' ',
//           yPath = String(y),
//           endPath = ' Z';
//       var pathing = path.concat(xPath,space,yPath,endPath);

//       var gaugeLayout = {
//           title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
//           shapes:[{
//               type: 'path',
//               path: pathing,
//               fillcolor: '#850000',
//               line: {
//                 color: '#850000'
//               }
//             }],
//           xaxis: {zeroline:false, 
//                   showticklabels:false,
//                   showgrid: false, 
//                   range: [-1, 1],
//                   fixedrange: true
//                 },
//           yaxis: {zeroline:false, 
//                   showticklabels:false,
//                   showgrid: false, 
//                   range: [-1, 1],
//                   fixedrange: true
//                 }
//         };
        
//         Plotly.newPlot("gauge", [gaugeTrace, dot], gaugeLayout);
//         }

  
init();




  


      

