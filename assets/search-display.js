var searchEl = document.querySelector("#form");
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
function showResults(results, search) {
    console.log(search);

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
    first.setAttribute("style", "display: flex; justify-content: space-evenly; align-items: center; margin-bottom: 40px; padding-left: 30%; padding-right: 30%;")
    
    var listEl = document.createElement("h1");
    listEl.textContent = "Artists similar to: " + artistName[0];
    first.append(listEl);
    
    var avatarImg = document.createElement("img");
    avatarImg.setAttribute("src", artistImg[0]);
    avatarImg.setAttribute("style", "border-radius: 100%;");
    first.append(avatarImg);

    searchSim(results.artists.items[0].data.uri, search);
}

// SEARCH SIMILAR ARTISTS
function searchSim(artistId, search) {
    Id = artistId.slice(15, 37);

    var relatedURL = 'https://spotify81.p.rapidapi.com/artist_related?id='

    if (Id) {
        relatedURL = 'https://spotify81.p.rapidapi.com/artist_related?id=' + Id;
    }

    fetch(relatedURL, options)
	.then(response => response.json())
	.then(response => shuffleArray(response.data.artist.relatedContent.relatedArtists.items))
	.catch(err => console.error(err));
}

// SIMILAR ARTIST SHUFFLE 
function shuffleArray(arrayToShuffle) {
    for (let i = arrayToShuffle.length - 1; i > 0; i --) {
        let randomPos = Math.floor(Math.random() * (i + 1));
        let temp = arrayToShuffle[i];
        arrayToShuffle[i] = arrayToShuffle[randomPos];
        arrayToShuffle[randomPos] = temp;
    }
    displaySim(arrayToShuffle)
}

// DISPLAY SIMILAR ARTISTS
function displaySim(shuffledArray) {
console.log(shuffledArray)
    let similarArtist = [];
    let simArtImg = [];
    let artistLink = [];
    for (let i = 0; i < shuffledArray.length; i++) {
        let similarArtists = shuffledArray[i].profile.name;
        similarArtist.push(similarArtists);
        let simArtImgs = shuffledArray[i].visuals.avatarImage.sources[0].url;
        simArtImg.push(simArtImgs);
        let artistLinks = "https://open.spotify.com/artist/" + shuffledArray[i].id;
        artistLink.push(artistLinks);
    }

    var second = document.querySelector("#second");
    second.setAttribute("style", "display: flex; justify-content: space-between; margin-bottom: 40px;");

    // FIRST
    var simCard = document.querySelector("#rel-art");
    var titleName = document.createElement("h1");
    titleName.textContent = similarArtist[0];
    simCard.append(titleName);
    var simImg = document.createElement("img");
    simImg.setAttribute("src", simArtImg[0]);
    simImg.onclick = function(){
        window.open(artistLink[0], "_blank");
    }
    simImg.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard.append(simImg);
    second.append(simCard);

    // SECOND
    var simCard2 = document.querySelector("#rel-art2");
    var titleName2 = document.createElement("h1");
    titleName2.textContent = similarArtist[1];
    simCard2.append(titleName2);
    var simImg2 = document.createElement("img");
    simImg2.setAttribute("src", simArtImg[1]);
    simImg2.onclick = function(){
        window.open(artistLink[1], "_blank");
    }
    simImg2.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard2.append(simImg2);
    second.append(simCard2);

    // THIRD
    var simCard3 = document.querySelector("#rel-art3");
    var titleName3 = document.createElement("h1");
    titleName3.textContent = similarArtist[2];
    simCard3.append(titleName3);
    var simImg3 = document.createElement("img");
    simImg3.setAttribute("src", simArtImg[2]);
    simImg3.onclick = function(){
        window.open(artistLink[2], "_blank");
    }
    simImg3.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard3.append(simImg3);
    second.append(simCard3);
    
    // FOURTH
    var simCard4 = document.querySelector("#rel-art4");
    var simImg4 = document.createElement("h1");
    simImg4.textContent = similarArtist[3];
    simCard4.append(simImg4);
    var simImg4 = document.createElement("img");
    simImg4.setAttribute("src", simArtImg[3]);
    simImg4.onclick = function(){
        window.open(artistLink[3], "_blank");
    }
    simImg4.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard4.append(simImg4);
    second.append(simCard4);

    // FIFTH
    var simCard5 = document.querySelector("#rel-art5");
    var titleName5 = document.createElement("h1");
    titleName5.textContent = similarArtist[4];
    simCard5.append(titleName5);
    var simImg5 = document.createElement("img");
    simImg5.setAttribute("src", simArtImg[4]);
    simImg5.onclick = function(){
        window.open(artistLink[4], "_blank");
    }
    simImg5.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard5.append(simImg5);
    second.append(simCard5);

    // SIXTH
    var simCard6 = document.querySelector("#rel-art6");
    var titleName6 = document.createElement("h1");
    titleName6.textContent = similarArtist[5];
    simCard6.append(titleName6);
    var simImg6 = document.createElement("img");
    simImg6.setAttribute("src", simArtImg[5]);
    simImg6.onclick = function(){
        window.open(artistLink[5], "_blank");
    }
    simImg6.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard6.append(simImg6);
    second.append(simCard6);

    var third = document.querySelector("#third");
    third.setAttribute("style", "display: flex; justify-content: space-between; margin-bottom: 40px;");

    // 7TH
    var simCard7 = document.querySelector("#rel-art7");
    var titleName7 = document.createElement("h1");
    titleName7.textContent = similarArtist[6];
    simCard7.append(titleName7);
    var simImg7 = document.createElement("img");
    simImg7.setAttribute("src", simArtImg[6]);
    simImg7.onclick = function(){
        window.open(artistLink[6], "_blank");
    }
    simImg7.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard7.append(simImg7);
    third.append(simCard7);

    // 8TH
    var simCard8 = document.querySelector("#rel-art8");
    var titleName8 = document.createElement("h1");
    titleName8.textContent = similarArtist[7];
    simCard8.append(titleName8);
    var simImg8 = document.createElement("img");
    simImg8.setAttribute("src", simArtImg[7]);
    simImg8.onclick = function(){
        window.open(artistLink[7], "_blank");
    }
    simImg8.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard8.append(simImg8);
    third.append(simCard8);
    
    // 9TH
    var simCard9 = document.querySelector("#rel-art9");
    var titleName9 = document.createElement("h1");
    titleName9.textContent = similarArtist[8];
    simCard9.append(titleName9);
    var simImg9 = document.createElement("img");
    simImg9.setAttribute("src", simArtImg[8]);
    simImg9.onclick = function(){
        window.open(artistLink[8], "_blank");
    }
    simImg9.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard9.append(simImg9);
    third.append(simCard9);    

    // 10TH
    var simCard10 = document.querySelector("#rel-art10");
    var titleName10 = document.createElement("h1");
    titleName10.textContent = similarArtist[9];
    simCard10.append(titleName10);
    var simImg10 = document.createElement("img");
    simImg10.setAttribute("src", simArtImg[9]);
    simImg10.onclick = function(){
        window.open(artistLink[9], "_blank");
    }
    simImg10.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard10.append(simImg10);
    third.append(simCard10);
    
    // 11TH
    var simCard11 = document.querySelector("#rel-art11");
    var titleName11 = document.createElement("h1");
    titleName11.textContent = similarArtist[10];
    simCard11.append(titleName11);
    var simImg11 = document.createElement("img");
    simImg11.setAttribute("src", simArtImg[10]);
    simImg11.onclick = function(){
        window.open(artistLink[10], "_blank");
    }
    simImg11.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard11.append(simImg11);
    third.append(simCard11);
    
    // 12TH
    var simCard12 = document.querySelector("#rel-art12");
    var titleName12 = document.createElement("h1");
    titleName12.textContent = similarArtist[11];
    simCard12.append(titleName12);
    var simImg12 = document.createElement("img");
    simImg12.setAttribute("src", simArtImg[11]);
    simImg12.onclick = function(){
        window.open(artistLink[11], "_blank");
    }
    simImg12.setAttribute("style", "width: 160px; border-radius: 5%; box-shadow: 10px 5px 5px red;")
    simCard12.append(simImg12);
    third.append(simCard12); 
   
    simCard.addEventListener("mouseenter", () => simCard.setAttribute("style", "width: 140px;"))
    simCard.addEventListener("mouseleave", () => simCard.setAttribute("style", "width: 160px;"))
    simCard2.addEventListener("mouseenter", () => simCard2.setAttribute("style", "width: 140px;"))
    simCard2.addEventListener("mouseleave", () => simCard2.setAttribute("style", "width: 160px;"))
    simCard3.addEventListener("mouseenter", () => simCard3.setAttribute("style", "width: 140px;"))
    simCard3.addEventListener("mouseleave", () => simCard3.setAttribute("style", "width: 160px;"))
    simCard4.addEventListener("mouseenter", () => simCard4.setAttribute("style", "width: 140px;"))
    simCard4.addEventListener("mouseleave", () => simCard4.setAttribute("style", "width: 160px;"))
    simCard5.addEventListener("mouseenter", () => simCard5.setAttribute("style", "width: 140px;"))
    simCard5.addEventListener("mouseleave", () => simCard5.setAttribute("style", "width: 160px;"))
    simCard6.addEventListener("mouseenter", () => simCard6.setAttribute("style", "width: 140px;"))
    simCard6.addEventListener("mouseleave", () => simCard6.setAttribute("style", "width: 160px;"))
    simCard7.addEventListener("mouseenter", () => simCard7.setAttribute("style", "width: 140px;"))
    simCard7.addEventListener("mouseleave", () => simCard7.setAttribute("style", "width: 160px;"))
    simCard8.addEventListener("mouseenter", () => simCard8.setAttribute("style", "width: 140px;"))
    simCard8.addEventListener("mouseleave", () => simCard8.setAttribute("style", "width: 160px;"))
    simCard9.addEventListener("mouseenter", () => simCard9.setAttribute("style", "width: 140px;"))
    simCard9.addEventListener("mouseleave", () => simCard9.setAttribute("style", "width: 160px;"))
    simCard10.addEventListener("mouseenter", () => simCard10.setAttribute("style", "width: 140px;"))
    simCard10.addEventListener("mouseleave", () => simCard10.setAttribute("style", "width: 160px;"))
    simCard11.addEventListener("mouseenter", () => simCard11.setAttribute("style", "width: 140px;"))
    simCard11.addEventListener("mouseleave", () => simCard11.setAttribute("style", "width: 160px;"))
    simCard12.addEventListener("mouseenter", () => simCard12.setAttribute("style", "width: 140px;"))
    simCard12.addEventListener("mouseleave", () => simCard12.setAttribute("style", "width: 160px;"))

    var newList = document.querySelector("#new");
    newList.addEventListener("click", function(){
        window.location.reload();
    })
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