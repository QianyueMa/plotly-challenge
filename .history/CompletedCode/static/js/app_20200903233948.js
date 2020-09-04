// Use the D3 library to read data in data.json.
function getData() {
    //var url = `data/data.json/metadata/${sample}`;
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
        Object.entries(data).forEach(([key, value]) => {   
            demographicInfo.append("h5").text(`${key}:${value}`);
        });
});

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function buildChart() {
    var url = `data/data.json/metadata/${sample}`;

    d3.json(url).then( (results) => {

        var otuId = results.otu_ids;
        var sampleValue = results.sample_values;
        var otuLabel = results.otu_labels;

        var trace1 = {
            // Use otu_ids as the labels for the bar chart.
            x: otuId,
            // Use sample_values as the values for the bar chart.
            y: sampleValue,
            // Use otu_labels as the hovertext for the chart.
            type: "bar"

        };

        var data = [trace1];

        var layout = {

        };

        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("plot", data, layout);
    }
};



// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.
// Display the sample metadata, i.e., an individual's demographic information.

// Display each key-value pair from the metadata JSON object somewhere on the page.

// Update all of the plots any time that a new sample is selected.