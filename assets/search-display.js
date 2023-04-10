function getParams() {
    var searchParamsArr = document.location.search.split('&');
    console.log(searchParamsArr);
    var search = searchParamsArr[0].split('=').pop();
    console.log(search);
    searchApi(search);

}

function searchApi(search) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3809945161msh094c90a344d6e01p14cd6fjsn36fc2e8ee7d5',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    var searchURL = 'https://shazam.p.rapidapi.com/search?term=search&locale=en-US&offset=0&limit=10'

    if (search) {
        searchURL = 'https://shazam.p.rapidapi.com/search?term=' + search + '&locale=en-US&offset=0&limit=10'
    }
    
    fetch(searchURL, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

getParams()
