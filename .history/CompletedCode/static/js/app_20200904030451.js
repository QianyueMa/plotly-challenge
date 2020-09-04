// Use the D3 library to read data in data.json.
function getData() {
    // Display the sample metadata, i.e., an individual's demographic information.
    d3.json("data/data.json/metadata").then( (data) => {
        var demographicInfo = d3.select("#sample-metadata").html("");
            // {
            //     "id":940,
            //     "ethnicity":"Caucasian",
            //     "gender":"F",
            //     "age":24.0,
            //     "location":"Beaufort/NC",
            //     "bbtype":"I",
            //     "wfreq":2.0
            //  },
        // Display each key-value pair from the metadata JSON object somewhere on the page.
        Object.entries(data).forEach(([key, value]) => {   
            demographicInfo.append("h5").text(`${key}:${value}`);
        });
    });
};

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function buildChart() {

    var url = `data/data.json/${samples}`;

    d3.json(url).then( (data) => {
        
        var otuId = data.otu_ids;
        // Sort and slice the top 10 OTUs in descending order, and reverse the array to accommodate Plotly's defaults
        var results = data.sort( (a, b) => b.otuId - a.otuId).slice(0, 10).reverse();

        var otuTop = otuId.map(d => d);
        var sampleValue = results.sample_values;
        var otuLabel = results.otu_labels;

        var trace1 = {
            // Use otu_ids as the labels for the bar chart.
            x: otuTop,
            // Use sample_values as the values for the bar chart.
            y: sampleValue,
            // Use otu_labels as the hovertext for the chart.
            type: "bar",
            orientation: "h",
            test: otuLabel
        };

        // Create a bubble chart that displays each sample.
        var trace2 = {
            x: otuTop,
            y: sampleValue,
            mode:"markers", 
            marker:{
              size: sampleValue,
              color: otuTop,
              colorscale: "Rainbow",
              labels: otuLabel,
              type: 'scatter',
              opacity: 0.3
            }
        };

        var data1 = [trace1];
        var data2 = [trace2];

        var layout = {
            title: "Top 10 OTUs Found in the Participant",
            xaxis: { title: 'OTU ID' },
        };

        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bar", data1, layout);
        Plotly.newPlot("bubble", data2, layout);

    });
};



// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.

