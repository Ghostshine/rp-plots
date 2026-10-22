// Plot data - URLs encoded in Base64 format
const plots = [
    {
        name: "Arrangement Marriage",
        url: "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xbzJSenV6dlh1X0hlMWk0bTFjMVZEX3lnTnZNY3ByX2x3QzF4cTBZaVMtMC9wcmV2aWV3"
    },
    {
        name: "Fantasy",
        url: "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xMHNlQWk1TkpoNWJBb29uTU80bXZvYUh6MlpyTVVqVFlvWWduSEFpUklTSS9wcmV2aWV3"
    },
    {
        name: "Popular",
        url: "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xU1YzZGFjTG95VFhZMXdPdU5uWm9DVk9WMVdMS2xwLWRNcnc0T2VyOHg5WS9wcmV2aWV3"
    }, 
    {
        name: "Casual",
        url: "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xSnZwNUJoeDYtb3M0VVBhNVlldE5CS29GSW4tLWpXUTRDcGRJSzU4ZzgvcHJldmlldw=="
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

    // Decode Base64 string in runtime memory only
    const decodedUrl = atob(plot.url);

    // Check variable in RAM instead of reading from HTML DOM
    if (currentUrlState !== decodedUrl) {
        doc.classList.add("loading");
        loadingBar.hidden = false;

        // Handle document loading
        doc.onload = () => {
            doc.classList.remove("loading");
            loadingBar.hidden = true;
        };

        // Save URL strictly inside JavaScript runtime
        currentUrlState = decodedUrl;
        doc.src = decodedUrl;
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
})
