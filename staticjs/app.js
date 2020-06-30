// d3.json("samples.json").then(function(data) {
//      console.log(data);
// });

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
  panel.append("p").text(`wfreq: ${filterVdata[0].wfreq}`);

}

init();




  


      

