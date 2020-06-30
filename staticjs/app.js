// d3.json("samples.json").then(function(data) {
//      console.log(data);
// });



function init() {
    
    var selector = d3.select("#selDataset");
  
    
    d3.json("samples.json").then(function(data){
      data.names.forEach((name) => {
        selector
          .append("option")
          .text(name)
          .property("value", name);
      });
  
      
      const firstSample = data.names[0];
      
      updatePlotly(firstSample);
    });
  }
  
d3.selectAll("#selDataset").on("change", updatePlotly); 

function updatePlotly() {

      d3.json("samples.json").then(function(importedData){
        console.log(importedData.metadata);
        var data = importedData;
            
        var dropdownMenu = d3.select("#selDataset");
        var dataset = dropdownMenu.property("value");
        var sampleData = d3.select(`#sample-metadata`);
      
        sampleData.html("");

        Object.entries(dataset).forEach(function([key,value]){
          var row = sampleData.append("p");
          row.text(`${key}:${value}`)
        })
      });
   
}
init();




  


      

