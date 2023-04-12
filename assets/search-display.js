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

    var searchURL = 'https://spotify81.p.rapidapi.com/search?q=&type=artists&offset=0&limit=50&numberOfTopResults=5';

    if (search) {
        searchURL = 'https://spotify81.p.rapidapi.com/search/?q=' + search + '&type=artists&albums&offset=0&limit=100&numberOfTopResults=5';
    }
    
    fetch(searchURL, options)
        .then(response => response.json())
        .then(response => showResults(response, search))
        .catch(err => console.error(err))
}

function showResults(results) {
    console.log(results);

    // TITLE
    var Title = document.querySelector("#title");
    Title.setAttribute("style", "display: flex; flex-direction: column; align-items: center; padding-bottom: 50px;");
    var searchTitle = document.querySelector("#search-title");
    searchTitle.textContent = "Here's what we have for you.";
    searchTitle.setAttribute("style", "margin: 1%;");

    // ARTIST LOOP
    var artistName = [];
    var artistImg = [];
    for (let i = 0; i < results.artists.items.length; i++) {
        var artistNames = results.artists.items[i].data.profile.name;
        artistName.push(artistNames)
        var artistImgs = results.artists.items[0].data.visuals.avatarImage.sources[1].url;
        artistImg.push(artistImgs)
    }
    console.log(artistImg[0])

    // DISPLAY SEARCHED RESULT
    var listCard = document.querySelector("#list-card");
    listCard.setAttribute("style", "padding-left: 50px;")

    var first = document.querySelector("#first");
    first.setAttribute("style", "display: flex; justify-content: space-evenly; align-items: center; margin-bottom: 40px;")
    var listEl1 = document.createElement("h3");
    listEl1.textContent = "Artists similar to: " + artistName[0];
    first.append(listEl1);
    
    var avatarImg = document.createElement("img");
    avatarImg.setAttribute("src", artistImg[0])
    avatarImg.setAttribute("style", "border-radius: 100%;")
    first.append(avatarImg);

    displaySim(results.artists.items[0].data.uri);
}

function displaySim(artistId) {
    console.log(artistId)
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
