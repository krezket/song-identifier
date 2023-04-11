////////////////// SEARCH FORM //////////////////////////////////
var searchEl = document.querySelector("#form")

function searchFormSubmit(event) {
    event.preventDefault();

    var textInputVal = document.querySelector("#text-input").value;

    var queryString = './search.html?q=' + textInputVal;

    location.assign(queryString);
}

searchEl.addEventListener("submit", searchFormSubmit)
/////////////////////////////////////////////////////////////////

var topCharts = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '61a72dd549msh4a4ae65982725acp1ad21ajsnb2c2fecc8b2c',
        'X-RapidAPI-Host': 'billboard-api5.p.rapidapi.com'
    }
};

fetch('https://billboard-api5.p.rapidapi.com/api/charts/hot-100?week=2023-04-11', topCharts)
    .then(response => response.json())
    .then(response => showResults(response))
    .catch(err => console.error(err));

function showResults(billboard) {
    // console.log(billboard.chart.entries[0].artist) 
    var list= billboard.chart.entries;
    for (let i = 0; i < 8; i++) {
       console.log(list[i]);
        
    }  
}
