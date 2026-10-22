// Base URL components hidden as variables
const driveDomain = "https://google.com";
const driveMethod = "/preview";

// Plot data - Only holding the clean document IDs now (zero typos possible!)
const plots = [
    {
        name: "Arrangement Marriage",
        id: "1o2RZuzvXu_He1k4m1c1VD_ygNvMcpr_lwC1xq0YiS-0"
    },
    {
        name: "Fantasy",
        id: "10seAi5NJh5bAoonMO4mvoaHz2ZrMUjTYoYgnHAiRISI"
    },
    {
        name: "Popular",
        id: "1SV3dacLoyTXY1wOuNnZoCVOV1WLKlp-dMrw4Oer8x9Y"
    }, 
    {
        name: "Casual",
        id: "1Jvp5BjHx6-os4UPa5YetNBKoFIn--jWQ4ChpdIK58g8"
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
