//Data recovery
fetch('data/recipes.json')
	.then(response => response.json())
	.then(data => {
		let main = document.createElement('main');
		let recipes = data.recipes;
	
		//Creation html elements of index page
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
					<ul class="ingredients" aria-label="ingredients">
					</ul>
					<p aria-label="instructions">
					${element.description}
					</p>
				</div>`;
				
				//let ul = document.querySelector('.ingredients');

				// element.ingredients.forEach(ingredient => ingredientElement.push(ingredient.ingredient.toLowerCase()));
				// ingredientElement.forEach(ingredient => {
				// 	let li = document.createElement('li');
				// 	li.innerHTML = ingredient;
					
				// 	ul.appendChild(li);
				// });
				
				main.appendChild(article);
				document.body.appendChild(main);			
			});
			
		};

		//Call the function to create index page
		indexCreation(recipes);

		//Algo 2 with filter() method
		let input = document.querySelector('#searchArea');

		input.addEventListener('input', e => {
			if(input.value.length >= 3){
				main.innerHTML = '';
				const element = e.target.value.toLowerCase();
			
				const newRecipes = recipes.filter(recipe => {
					if(recipe.name.toLowerCase().includes(element) || recipe.description.toLowerCase().includes(element)){
						return true;
					}
				});
				indexCreation(newRecipes);
			}else{
				main.innerHTML ='';
				indexCreation(recipes);
			}
		});
			
	});

