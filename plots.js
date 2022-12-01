
function init() {
  var selector = d3.select("#selDataset");

  var sampleNames = samples.names;
  sampleNames.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      .property("value", sample);
  })};



d3.selectAll("#dropdownMenu").on("change", updatePlotly);
  
  function updatePlotly() {
    var dropdownMenu = d3.select("#dropdownMenu");
    var dataset = dropdownMenu.property("value");
  
    var xData = [1, 2, 3, 4, 5];
    var yData = [];
  
    if (dataset === 'dataset1') {
      yData = [1, 2, 4, 8, 16];
    };
  
    if (dataset === 'dataset2') {
      yData = [1, 10, 100, 1000, 10000];
    };
  
    var trace = {
      x: [xData],
      y: [yData],
    };
    Plotly.restyle("plot", trace);
  };


function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
    var metadata = samples.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    Object.entries(result).forEach( pear =>
      PANEL.append("h6").text(pear[0]+": "+pear[1]+"\n"));
}



init();