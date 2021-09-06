fetch('../data/recipes.json')
	.then(response => response.json())
	.then(data => console.log(data));
