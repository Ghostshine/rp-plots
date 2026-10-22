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
        name: "Popular",
        url: "https://docs.google.com/document/d/1SV3dacLoyTXY1wOuNnZoCVOV1WLKlp-dMrw4Oer8x9Y/preview"
    }, 
    {
        name: "Casual",
        url: "https://docs.google.com/document/d/1Jvp5BjHx6-os4UPa5YetNBKoFIn--jWQ4ChpdIK58g8/preview"
    }
];

// Memory state tracker - replaces HTML dataset and keeps raw URL hidden
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

    // Decode Base64 string back to the real URL only in RAM
    const decodedUrl = atob(plot.url);

    // Check variable in RAM instead of reading from HTML DOM dataset
    if (currentUrlState !== decodedUrl) {
        doc.classList.add("loading");
        loadingBar.hidden = false;

        // Handle document loading
        doc.onload = () => {
            doc.classList.remove("loading");
            loadingBar.hidden = true;
        };

        // Save decoded URL strictly inside JavaScript runtime
        currentUrlState = decodedUrl;
        
        // Inject decoded URL directly to src
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
});
