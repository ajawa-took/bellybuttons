
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
  //  data i want for chart:  result.otu_ids, result.otu_labels, result.sample_values
  //  todo: add "OTU " to otu_id , simple + works
  //  GET TOP 10 -- sample_values are already sorted descending!!

  var yticks = result.otu_ids.slice(0,10).reverse().map(x => "OTU "+ x );
  var xvals = result.sample_values.slice(0,10).reverse();
  var ytext = result.otu_labels.slice(0,10).reverse();

  var barData = [ {x: xvals, y: yticks, 
      text: ytext,
      type: "bar", orientation: 'h'}];
      // 9. Create the layout for the bar chart. 
  var barLayout = {title : "Top 10 Bacteria Cultures Found"};
      // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", barData, barLayout) ;
}

init();