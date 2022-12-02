
function init() {
  var selector = d3.select("#selDataset");

  var sampleNames = data.names;
  sampleNames.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      .property("value", sample);
  });
  optionChanged("940")
  };



function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    Object.entries(result).forEach( pear =>
      PANEL.append("h6").text(pear[0]+": "+pear[1]+"\n"));
}

function buildCharts(sample) {
  var samples = data.samples;
  var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
  var result = resultArray[0];
      // 8. Create the trace for the bar chart. 
  
  //    result.otu_ids, result.otu_labels, result.sample_values

  var barData = [ {x: result.sample_values, y: result.otu_ids, 
      text: result.otu_labels,
      type: "bar", orientation: 'h'}];
      // 9. Create the layout for the bar chart. 
  var barLayout = {title : "Top 10 Bacteria Cultures Found"};
      // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", barData, barLayout) ;
}

init();