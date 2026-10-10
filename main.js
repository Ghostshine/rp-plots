// Plot data
const plots = [
    {
        name: "Arrangement Marriage",
        url: "https://docs.google.com/document/d/1o2RZuzvXu_He1k4m1c1VD_ygNvMcpr_lwC1xq0YiS-0/preview"
    },
    {
        name: "Fantasy",
        url: "https://docs.google.com/document/d/10seAi5NJh5bAoonMO4mvoaHz2ZrMUjTYoYgnHAiRISI/preview"
    },
    {
        name: "Sławni",
        url: "https://docs.google.com/document/d/1SV3dacLoyTXY1wOuNnZoCVOV1WLKlp-dMrw4Oer8x9Y/preview"
    }
];

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
// Open the selected plot
function openPlot(plot) {
    title.textContent = plot.name;

    listView.hidden = true;
    docView.hidden = false;

    const loadingBar = document.getElementById("loadingBar");

    if (doc.dataset.currentUrl !== plot.url) {
        // Hide the previous document
        doc.classList.add("loading");
        loadingBar.hidden = false;

        // Handle document loading
        doc.onload = () => {
            doc.classList.remove("loading");
            loadingBar.hidden = true;
        };

        // Load the selected document
        doc.dataset.currentUrl = plot.url;
        doc.src = plot.url;
    } else {
        // Show the already loaded document
        doc.classList.remove("loading");
        loadingBar.hidden = true;
    }

    // Scroll to the top
    window.scrollTo({
        top: 0,
        behavior: "auto"
    });
}

// Return to the plot list
backButton.addEventListener("click", () => {
    docView.hidden = true;
    listView.hidden = false;

    // Keep the document loaded for faster reopening
    window.scrollTo({
        top: 0,
        behavior: "auto"
    });
});
