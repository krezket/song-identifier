var searchEl = document.querySelector("#form")
var listCard = document.querySelector("#list-card");

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3809945161msh094c90a344d6e01p14cd6fjsn36fc2e8ee7d5',
        'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
    }
};

function getParams() {
    var searchParamsArr = document.location.search.split('&');
    var search = searchParamsArr[0].split('=').pop();
    searchApi(search);

}

// INITIAL SEARCH
function searchApi(search) {

    var searchURL = 'https://spotify81.p.rapidapi.com/search?q=&type=artists&offset=0&limit=50&numberOfTopResults=5';

    if (search) {
        searchURL = 'https://spotify81.p.rapidapi.com/search/?q=' + search + '&type=artists&albums&offset=0&limit=100&numberOfTopResults=5';
    }
    
    fetch(searchURL, options)
        .then(response => response.json())
        .then(response => showResults(response, search))
        .catch(err => console.error(err))
}

// SEARCH RESULTS
function showResults(results) {
    console.log(results);

    // TITLE
    var Title = document.querySelector("title");
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
    listCard.setAttribute("style", "padding-left: 50px; padding-right: 50px;")
    var first = document.querySelector("#first");
    first.setAttribute("style", "display: flex; justify-content: space-evenly; align-items: center; margin-bottom: 40px;")
    
    var listEl = document.createElement("h1");
    listEl.textContent = "Artists similar to: " + artistName[0];
    first.append(listEl);
    
    var avatarImg = document.createElement("img");
    avatarImg.setAttribute("src", artistImg[0]);
    avatarImg.setAttribute("style", "border-radius: 100%;");
    first.append(avatarImg);

    searchSim(results.artists.items[0].data.uri);
}

// SEARCH SIMILAR ARTISTS
function searchSim(artistId) {
    Id = artistId.slice(15, 37);

    var relatedURL = 'https://spotify81.p.rapidapi.com/artist_related?id='

    if (Id) {
        relatedURL = 'https://spotify81.p.rapidapi.com/artist_related?id=' + Id;
    }

    fetch(relatedURL, options)
	.then(response => response.json())
	.then(response => displaySim(response))
	.catch(err => console.error(err));
}

// DISPLAY SIMILAR ARTISTS
function displaySim(simResults) {
    console.log(simResults)

    // SIMILAR ARTIST LOOP
    let similarArtist = [];
    let simArtImg = [];
    for (let i = 0; i < simResults.data.artist.relatedContent.relatedArtists.items.length; i++) {
        let similarArtists = simResults.data.artist.relatedContent.relatedArtists.items[i].profile.name;
        similarArtist.push(similarArtists);
        let simArtImgs = simResults.data.artist.relatedContent.relatedArtists.items[i].visuals.avatarImage.sources[0].url;
        simArtImg.push(simArtImgs);
    }
    
    var second = document.querySelector("#second");
    second.setAttribute("style", "display: flex; justify-content: space-between;");
    var cardClass = document.querySelector("card")

    // FIRST
    var simCard = document.querySelector("#rel-art");
    var titleName = document.createElement("h1");
    titleName.textContent = similarArtist[0];
    simCard.append(titleName);
    var simImg = document.createElement("img");
    simImg.setAttribute("src", simArtImg[0]);
    simImg.setAttribute("style", "width: 160px; border-radius: 5%;")
    simCard.append(simImg);
    second.append(simCard);

    // SECOND
    var simCard2 = document.querySelector("#rel-art2");
    var titleName2 = document.createElement("h1");
    titleName2.textContent = similarArtist[1];
    simCard2.append(titleName2);
    var simImg2 = document.createElement("img");
    simImg2.setAttribute("src", simArtImg[1]);
    simImg2.setAttribute("style", "width: 160px; border-radius: 5%;")
    simCard2.append(simImg2);
    second.append(simCard2);

    // THIRD
    var simCard3 = document.querySelector("#rel-art3");
    var titleName3 = document.createElement("h1");
    titleName3.textContent = similarArtist[2];
    simCard3.append(titleName3);
    var simImg3 = document.createElement("img");
    simImg3.setAttribute("src", simArtImg[2]);
    simImg3.setAttribute("style", "width: 160px; border-radius: 5%;")
    simCard3.append(simImg3);
    second.append(simCard3);
    
    // FOURTH
    var simCard4 = document.querySelector("#rel-art4");
    var simImg4 = document.createElement("h1");
    simImg4.textContent = similarArtist[3];
    simCard4.append(simImg4);
    var simImg4 = document.createElement("img");
    simImg4.setAttribute("src", simArtImg[3]);
    simImg4.setAttribute("style", "width: 160px; border-radius: 5%;")
    simCard4.append(simImg4);
    second.append(simCard4);

    // FIFTH
    var simCard5 = document.querySelector("#rel-art5");
    var titleName5 = document.createElement("h1");
    titleName5.textContent = similarArtist[4];
    simCard5.append(titleName5);
    var simImg5 = document.createElement("img");
    simImg5.setAttribute("src", simArtImg[4]);
    simImg5.setAttribute("style", "width: 160px; border-radius: 5%;")
    simCard5.append(simImg5);
    second.append(simCard5);

    // SIXTH
    var simCard6 = document.querySelector("#rel-art6");
    var titleName6 = document.createElement("h1");
    titleName6.textContent = similarArtist[5];
    simCard6.append(titleName6);
    var simImg6 = document.createElement("img");
    simImg6.setAttribute("src", simArtImg[5]);
    simImg6.setAttribute("style", "width: 160px; border-radius: 5%;")
    simCard6.append(simImg6);
    second.append(simCard6)
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