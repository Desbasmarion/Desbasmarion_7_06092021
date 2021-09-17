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

		let dataTitle = [];
		let dataIngredient = [];
		let dataDescription = [];

		//Retrieve data needed to compare to the user input
		for(let i=0; i<recipes.length; i++){
			dataTitle.push(recipes[i].name.toLowerCase());
			dataDescription.push(recipes[i].description.toLowerCase());
			recipes[i].ingredients.forEach(ingredient => dataIngredient.push(ingredient.ingredient.toLowerCase()));
		}
		
		let allData = dataTitle.concat(dataIngredient, dataDescription);
		let arrayFilter = [];
		let newArray = [];

		//Comparison between name data and user input
		let input = document.querySelector('#searchArea');
		input.addEventListener('input', () => {
			if(input.value.length >= 3){
				main.innerHTML = '';
				for(let i=0; i<allData.length; i++){
					if(allData[i].includes(input.value)){
						arrayFilter.push(allData[i]);
						for(let i=0; i<recipes.length; i++){
							arrayFilter.forEach(element => {
								if(recipes[i].name.toLowerCase().includes(element)){
									newArray.push(recipes[i]);
								}else if(recipes[i].description.toLowerCase().includes(element)){
									newArray.push(recipes[i]);
								}else if(recipes[i].ingredients.forEach(ingredient => ingredient.ingredient.includes(element))){
									newArray.push(recipes[i]);
								}
							});
						}
					
						//Removal of duplicates
						const uniqueSet = new Set(newArray);
						const uniqueArray = Array.from(uniqueSet);
						
						//Creation index page with recipes filtered
						indexCreation(uniqueArray);
					}
				}
			}
		});	
	})
	.catch(err => console.log(err));
