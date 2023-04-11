var searchEl = document.querySelector("#form")

function getParams() {
    var searchParamsArr = document.location.search.split('&');
    var search = searchParamsArr[0].split('=').pop();
    searchApi(search);

}

function searchApi(search) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3809945161msh094c90a344d6e01p14cd6fjsn36fc2e8ee7d5',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    var searchURL = 'https://spotify81.p.rapidapi.com/search?q=%3CREQUIRED%3E&type=genre&offset=0&limit=20&numberOfTopResults=5';

    if (search) {
        searchURL = 'https://spotify81.p.rapidapi.com/search/?q=' + search + '&type=genre&offset=0&limit=20&numberOfTopResults=5';
    }
    
    fetch(searchURL, options)
        .then(response => response.json())
        .then(response => showResults(response, search))
        .catch(err => console.error(err))
}

function showResults(results) {

    // TITLE
    var searchTitle = document.querySelector("#search-title");
    var resultCon = document.querySelector("#search-result");
    searchTitle.textContent = "";
    searchTitle.textContent = "Genres";
    searchTitle.setAttribute("style", "margin: 1%;")


    // GENRE LOOP
    var genreName = [];
    var genreImg = [];
    for (let i = 0; i < results.genres.items.length; i++) {
        var genreNames = results.genres.items[i].data.name;
        genreName.push(genreNames);
        var genreImgs = results.genres.items[i].data.image.sources[0].url;
        genreImg.push(genreImgs)
    }

    // DISPLAY RESULTS
    var listEl = document.createElement("h3");
    listEl.textContent = genreName[0];
    resultCon.append(listEl);
    var avatarImg = document.createElement("img");
    avatarImg.setAttribute("src", genreImg[0]);
    resultCon.append(avatarImg);


    // console.log(search)
    console.log(results);
    // console.log(results.artists.items[0].data.profile.name);
    // console.log(results.artists.items[0].data.uri)
    
}

// SEARCH FORM 
function searchFormSubmit(event) {
    event.preventDefault();

    var textInputVal = document.querySelector("#text-input").value;

    var queryString = './search.html?q=' + textInputVal;

    location.assign(queryString);
}

searchEl.addEventListener("submit", searchFormSubmit)

getParams()
