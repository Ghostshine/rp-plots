// Base URL components hidden as variables
const driveDomain = "https://google.com";
const driveMethod = "/preview";

// Plot data - Only holding the clean document IDs now (zero typos possible!)
const plots = [
    {
        name: "Arrangement Marriage",
        id: "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xbzJSWnV6dlh1X0hlMWs0bTFjMVZEX3lnTnZNY3ByX2x3QzF4cTBZaVMtMC9lZGl0P3VzcD1zaGFyaW5n"
    },
    {
        name: "Fantasy",
        id: "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xMHNlQWk1TkpoNWJBb29uTU80bXZvYUh6MlpyTVVqVFlvWWduSEFpUklTSS9lZGl0P3VzcD1zaGFyaW5n"
    },
    {
        name: "Popular",
        id: "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xU1YzZGFjTG95VFhZMXdPdU5uWm9DVk9WMVdMS2xwLWRNcnc0T2VyOHg5WS9lZGl0P3VzcD1zaGFyaW5n"
    }, 
    {
        name: "Casual",
        id: "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xSnZwNUJqSHg2LW9zNFVQYTVZZXROQktvRkluLS1qV1E0Q2hwZElLNThnOC9lZGl0P3VzcD1zaGFyaW5n"
    }
];

// Memory state tracker - replaces HTML dataset
let currentUrlState = "";

// Get HTML elements
const list = document.getElementById("plot");
const listView = document.getElementById("plot-list");
const docView = document.getElementById("documentView");
const doc = document.getElementById("document");
const title = document.getElementById("plotTitle");
const backButton = document.getElementById("back");

// Generate the plot list
plots.forEach((plot) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = plot.name;

    button.addEventListener("click", () => {
        openPlot(plot);
    });

    listItem.appendChild(button);
    list.appendChild(listItem);
});

// Open the selected plot
function openPlot(plot) {
    title.textContent = plot.name;

    listView.hidden = true;
    docView.hidden = false;

    const loadingBar = document.getElementById("loadingBar");

    // Combine the URL parts together safely in memory
    const fullUrl = driveDomain + plot.id + driveMethod;

    // Check variable in RAM instead of reading from HTML DOM
    if (currentUrlState !== fullUrl) {
        doc.classList.add("loading");
        loadingBar.hidden = false;

        // Handle document loading
        doc.onload = () => {
            doc.classList.remove("loading");
            loadingBar.hidden = true;
        };

        // Save URL strictly inside JavaScript runtime
        currentUrlState = fullUrl;
        doc.src = fullUrl;
    } else {
        doc.classList.remove("loading");
        loadingBar.hidden = true;
    }

    window.scrollTo({
        top: 0,
        behavior: "auto"
    });
}

// Return to the plot list
backButton.addEventListener("click", () => {
    docView.hidden = true;
    listView.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "auto"
    });
});
