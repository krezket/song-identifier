var topCharts = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '61a72dd549msh4a4ae65982725acp1ad21ajsnb2c2fecc8b2c',
		'X-RapidAPI-Host': 'billboard-api5.p.rapidapi.com'
	}
};

fetch('https://billboard-api5.p.rapidapi.com/api/charts/hot-100?week=2022-10-27', topCharts)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
    console.log(topCharts)