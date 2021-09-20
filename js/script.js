//Data recovery
fetch('data/recipes.json')
	.then(response => response.json())
	.then(data => {
		let main = document.createElement('main');
		let recipes = data.recipes;
	
		/////////////////////////////////////CREATION INDEX PAGE/////////////////////////////////////
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

		/////////////////////////////////////ALGO 2 WITH FILTER() METHOD/////////////////////////////////////
		let input = document.querySelector('#searchArea');

		input.addEventListener('input', e => {
			if(input.value.length >= 3){
				main.innerHTML = '';
				const element = e.target.value.toLowerCase();
			
				const newRecipes = recipes.filter(recipe => {
					for(let i=0; i<recipe.ingredients.length;i++){
						if(recipe.name.toLowerCase().includes(element) || recipe.description.toLowerCase().includes(element) || recipe.ingredients[i].ingredient.toLowerCase().includes(element)){
							return true;
						}
					}
				});
				indexCreation(newRecipes);
			}else{
				main.innerHTML ='';
				indexCreation(recipes);
			}
		});

		/////////////////////////////////////TAGS FILTER/////////////////////////////////////
		let ingredientSelect = document.querySelector('#ingredients');
		let deviceSelect = document.querySelector('#appareil');
		let ustensilSelect = document.querySelector('#ustensiles');

		//Recovery ingredients
		let dataIngredients = []; 
		recipes.forEach(recipe => recipe.ingredients.forEach(ingredient => dataIngredients.push(ingredient.ingredient.toLowerCase())));

		//Recovery devices
		let dataDevices = [];
		recipes.forEach(recipe => dataDevices.push(recipe.appliance.toLowerCase()));

		//Recovery ustensiles 
		let dataUstensiles = [];
		recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => dataUstensiles.push(ustensil.toLowerCase())));
		
		//Function for creation tags
		let creationTags = (unique, data, newArray, select) => {
			unique = new Set(data);
			newArray = Array.from(unique);
			newArray.forEach(array => {
				let option = document.createElement('option');
				option.innerHTML = array;
				select.append(option);
			});
		};

		//Creation ingredients tags
		let uniqueIngredients =[];
		let newArrayIngredients = [];

		creationTags(uniqueIngredients, dataIngredients, newArrayIngredients, ingredientSelect);

		//Creation devices tags
		let uniqueDevices = [];
		let newArrayDevices = [];

		creationTags(uniqueDevices, dataDevices, newArrayDevices, deviceSelect);

		//Creation ustensiles tags
		let uniqueUstensiles = [];
		let newArrayUstensiles = [];

		creationTags(uniqueUstensiles, dataUstensiles, newArrayUstensiles, ustensilSelect);

		//Filter ingredients tag 
		let ingredientsFilter = [];
		
		ingredientSelect.addEventListener('change', e => {
			main.innerHTML = '';
			const element = e.target.value.toLowerCase();

			ingredientsFilter = recipes.filter(recipe => {
				for(let i=0; i<recipe.ingredients.length;i++){
					if(recipe.ingredients[i].ingredient.toLowerCase().includes(element)){
						return true;
					}
				}
			});
			indexCreation(ingredientsFilter);
		});

		//Filter devices tag
		let devicesFilter = [];
		
		deviceSelect.addEventListener('change', e => {
			main.innerHTML = '';
			const element = e.target.value.toLowerCase();

			devicesFilter = recipes.filter(recipe => {
				if(recipe.appliance.toLowerCase().includes(element)){
					return true;
				}
			});
			indexCreation(devicesFilter);
		});

		//Filter ustensiles tag
		let ustensilesFilter = [];

		ustensilSelect.addEventListener('change', e => {
			main.innerHTML = '';
			const element = e.target.value.toLowerCase();

			let tag = document.createElement('span');
			tag.classList.add('tag');
			tag.innerHTML = element;
			document.body.appendChild(tag);

			ustensilesFilter = recipes.filter(recipe => {
				for(let i=0; i<recipe.ustensils.length;i++){
					if(recipe.ustensils[i].toLowerCase().includes(element)){
						return true;
					}
				}
			});
			indexCreation(ustensilesFilter);
		});		
	});
