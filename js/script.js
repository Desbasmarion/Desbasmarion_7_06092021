//Data recovery
fetch('data/recipes.json')
	.then(response => response.json())
	.then(data => {
		let main = document.createElement('main');
		let recipes = data.recipes;
		
		const indexCreation = (array) => {
			array.forEach(element => {
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

		indexCreation(recipes);

		let dataTitle = [];
		let dataIngredient = [];
		let dataDescription = [];

		for(let i=0; i<recipes.length; i++){
			dataTitle.push(recipes[i].name.toLowerCase());
			dataDescription.push(recipes[i].description.toLowerCase());
			recipes[i].ingredients.forEach(ingredient => dataIngredient.push(ingredient.ingredient.toLowerCase()));
		}
		
		let allData = dataTitle.concat(dataIngredient, dataDescription);
		let arrayFilter = [];

		let input = document.querySelector('#searchArea');
		input.addEventListener('input', () => {
			for(let i=0; i<allData.length; i++){
				if(allData[i].startsWith(input.value)){
					arrayFilter.push(allData[i]);
				}
			}
			let finalArray = [];
			
			finalArray = recipes.forEach(recipe => {
				arrayFilter.some(element => recipe.ingredients.includes(element));
			
			});
			
			console.log(finalArray);
		});	

		
	})
	.catch(err => console.log(err));
