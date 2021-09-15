//Data recovery
const fetchData = () => fetch('data/recipes.json').then(response => response.json()).then(data => data.recipes).catch(err => console.log(err));

//Creation recipes block
const creationIndex = async() => {
	const mainData = await fetchData();
	let main = document.createElement('main');
	
	mainData.forEach(element => {
		let article = document.createElement('article');
		article.classList.add('recipeCard');
		article.innerHTML += `<img src="assets/recipe.jpg" alt="recipe image">
		<div class="ligne1">
			<h2 aria-label="name of the recipe">${element.name}</h2>
			<i class="far fa-clock"></i>
			<span>${element.time}min</span>
		</div>
		<div class="ligne2">
			<ul aria-label="ingredients">
				<li>
					${element.ingredients}
				</li>
			</ul>
			<p aria-label="instructions">
			${element.description}
			</p>
		</div>`;

		main.appendChild(article);
		document.body.appendChild(main);
	});
};
creationIndex();

//Algo 1 search recipes
const search = async() => {
	const mainData = await fetchData();
	mainData.forEach(data => {
		if(data.name.startsWith(input.value)){
			console.log('ok');
		}else{
			console.log('Ko');
		}
	});
};

let input = document.querySelector('#searchArea');
input.addEventListener('change', search);


