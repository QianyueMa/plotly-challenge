// Use the D3 library to read in data samples.json.

// "names"
// Read "names" from json and display them in a dropdown menu
function getName() {

    // Select dropdown menu id and assign it to a variable
    var dropdownMenu = d3.select('#selDataset');

    // Read "names" values and append them into dropdown menu
    // Update all of the plots any time that a new sample is selected.
    d3.json('data/samples.json')
        .then(subject => subject.names
            .forEach(name => dropdownMenu
                .append('option')
                .text(name)
                .property('value'),

                // Initialize page with default metadata and plots   
                getMetadata(subject.names[0]),
                buildCharts(subject.names[0]),
            ),
        );
};
getName();


// "metadata"
// Display the sample metadata, i.e., an individual's demographic information.
// e.g., {"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0}, ...
function getMetadata(id) {
    
    // Read "metadata" from json file for each subject and assign it to a variable
    d3.json('data/samples.json').then( (data) => {

        var subjectData = data.metadata
            .filter(subject => subject.id.toString() === id)[0];

        // Select demographic info id and assign it to a variable
        var subjectDemographic = d3.select('#sample-metadata');

        // Clear the metadata before displaying a new set of selected data 
        subjectDemographic.html('');

        // Push each key-value pair from the metadata JSON object onto into demographic info card.
        Object.entries(subjectData)
            .forEach(([key, value]) => subjectDemographic
                .append('h5')
                .text(`${key}: ${value}`),
            );
    });
};
getMetadata();


// Function called by DOM changes
function optionChanged(id) {
    getMetadata(id);
    buildCharts(id);
};


getName();


// Create a horizontal bar chart and a bubble chart to display the top 10 OTUs found in that individual. 
function buildCharts(id) {

    // Read data from json for plotting
    d3.json('data/samples.json').then( (data) => {

        // Dataset structure: names, metadata, samples
        // -> "samples": id, otu_ids, sample_values, otu_labels
        var nameResults = data.samples
            .filter(sample => sample.id === id)[0];

        // Check out the console for a friendlier layout
        console.log("Participant X's data:")
        console.log(nameResults);

        // Extract otu_ids, sample_values, otu_labels data
        var sampleValues = nameResults.sample_values; // Use sample_values as the values for the bar chart.
        var outIds = nameResults.otu_ids; // Use otu_ids as the labels for the bar chart.
        var outLabels = nameResults.otu_labels // Use otu_labels as the hovertext for the chart.
        
        // Trace for bar chart that displays each sample values
        var barTrace = {
            // Sort and slice the top 10 OTUs in descending order, and reverse the array to accommodate Plotly's defaults
            x: sampleValues.slice(0, 10).reverse(), // x values
            y: outIds.slice(0, 10).map(otuid => `OTU ${otuid}`).reverse(), // y values
            text: outLabels.slice(0, 10).reverse(), // the hover texts
            hoverlabel: { font: { size: 12 } },
            marker: {
                color: 'blue',
                opacity: 0.8,
            }, // the colour of the bars
            type: 'bar',
            orientation: 'h' // a horizontal bar chart
        };

        // Trace for bubble chart
        var bubbleTrace = {
            x: outIds,
            y: sampleValues,
            text: outLabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: outIds,
                colorscale: "Rainbow",
                opacity: 0.5,
            },
        };

        // Data
        var barData = [barTrace];
        var bubbleData = [bubbleTrace];

        // Layout set up
        var Layout = {
            title: {
                text: `Top 10 OTUs Found in the Subject ${id}`,
                font: {
                    family: 'Arial',
                    size: 24,
                    color: 'navy'
                    },
                },
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' }, 
            };
        
        // Plot the chart
        Plotly.newPlot('bar', barData, Layout);
        Plotly.newPlot('bubble', bubbleData, Layout);

    });
};

buildCharts();
