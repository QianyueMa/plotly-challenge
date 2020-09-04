function buildMetadata(sample) {

    // @TODO: Complete the Following Function that Builds the Metadata Panel
  
    // Use `d3.json` to Fetch the Metadata for a Sample
      d3.json(`/metadata/${sample}`).then((data) => {
          // Use d3 to Select the Panel with id of `#sample-metadata`
          var PANEL = d3.select("#sample-metadata");
          // Use `.html("") to Clear any Existing Metadata
          PANEL.html("");
          // Use `Object.entries` to Add Each Key & Value Pair to the Panel
          // Hint: Inside the Loop, Use d3 to Append New Tags for Each Key-Value in the Metadata
          Object.entries(data).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}:${value}`);
          })
          // BONUS: Build the Gauge Chart
            buildGauge(data.WFREQ);
      })
  };

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// function buildChart() {
//     // Use the D3 library to read in data samples.json.
//     d3.json("data/sample.json").then( (data) => {
//         var trace1 = {
//             // Use otu_ids as the labels for the bar chart.
//             x: sample.
//             // Use sample_values as the values for the bar chart.
//             // Use otu_labels as the hovertext for the chart.

//         };

//         var data = [trace1];

//         var layout = {

//         };

//         // Plot the chart to a div tag with id "plot"
//         Plotly.newPlot("plot", data, layout);
//     }
// };




// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.
// Display the sample metadata, i.e., an individual's demographic information.

// Display each key-value pair from the metadata JSON object somewhere on the page.

// Update all of the plots any time that a new sample is selected.