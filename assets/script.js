////////////////// SEARCH FORM //////////////////////////////////
var searchEl = document.querySelector("#form")
var top8 = document.querySelector("#chartList")
var songList = document.getElementById('songList');
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
        'X-RapidAPI-Host': 'billboard3.p.rapidapi.com'
    }
};

fetch('https://billboard3.p.rapidapi.com/hot-100?date=2023-04-07&range=1-8', topCharts)
    .then(response => response.json())
    .then(response => display(response))
    .catch(err => console.error(err));

function display(response) {
    list = response;

    for (let i = 0; i < 8; i++) {
        console.log(list[i].artist)
        console.log(list[i].title)

    }
    
    for (let i = 0; i < list.length; i++) {
        var li = document.createElement('li');
        li.textContent = list[i].artist+ ":"+list[i].title;
        songList.appendChild(li)
    }

    // for (let i = 0; i < list.length; i++) {
    //     var li = document.createElement('li');
    //     li.textContent = list[i].title;
    //     songList.appendChild(li)
    // }

}


