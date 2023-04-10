var headerEl = document.querySelector("#header");
var searchEl = document.querySelector("#form")

function searchFormSubmit(event) {
    event.preventDefault();

    var textInputVal = document.querySelector("#text-input").value;

    var queryString = './search.html?q=' + textInputVal;

    location.assign(queryString);
}

searchEl.addEventListener("submit", searchFormSubmit)