//Data recovery
fetch('data/recipes.json')
	.then(response => response.json())
	.then(data => {
		let main = document.createElement('main');
		let selectContainer = document.querySelector('#select');
		let tagContainer = document.querySelector('#tagContainer');
		let recipes = data.recipes;
	
		/////////////////////////////////////CREATION INDEX PAGE/////////////////////////////////////
		const indexCreation = (array) => {
			array.forEach(element => {
				
				let article = document.createElement('article');
				article.classList.add('recipeCard');
				let arrayUstensiles = [];
				element.ustensils.filter(ustensil => arrayUstensiles.push(ustensil.toLowerCase()));
				let arrayIngredients = [];
				element.ingredients.filter(ingredient => arrayIngredients.push(ingredient.ingredient.toLowerCase()));

				article.dataset.tag = `${element.appliance.toLowerCase()}, ${arrayUstensiles}, ${arrayIngredients}`;
				article.innerHTML += `<img src="assets/recipe.jpg" alt="recipe image">
				<div class="ligne1">
					<h2 aria-label="name of the recipe">${element.name}</h2>
					<div class="minutes">
						<i class="far fa-clock"></i>
						<span>${element.time}min</span>
					</div>
				</div>
				`;

				let ligne2 = document.createElement('div');
				ligne2.classList.add('ligne2');
				let ul = document.createElement('ul');
				ul.classList.add('ingredients');
				let instructions = document.createElement('p');
				instructions.classList.add('instructions');
				instructions.innerHTML += element.description;
				
				for (let ingredient of element.ingredients){
					let li = document.createElement('li');
				
					if(ingredient.quantity == undefined){
						li.innerHTML += `${ingredient.ingredient}`;
					}else if(ingredient.unit == undefined){
						li.innerHTML += `${ingredient.ingredient}: ${ingredient.quantity}`;
					}else{
						li.innerHTML += `${ingredient.ingredient}: ${ingredient.quantity}${ingredient.unit}`;
					}
					
					ul.appendChild(li);
				}

				article.appendChild(ligne2);
				ligne2.appendChild(ul);
				ligne2.appendChild(instructions);

				main.appendChild(article);
				document.body.appendChild(main);			
			});
		};

		//Call the function to create index page
		indexCreation(recipes);

		/////////////////////////////////////ALGO 2 WITH FILTER() METHOD/////////////////////////////////////
		let input = document.querySelector('#searchArea');

		let algoSearch = () => {
			input.addEventListener('input', e => {
				if(input.value.length >= 3){
					main.innerHTML = '';
					const element = e.target.value.toLowerCase();
				
					const newRecipes = recipes.filter(recipe => {
						for(let i=0; i<recipe.ingredients.length;i++){
							return (recipe.name.toLowerCase().includes(element) || recipe.description.toLowerCase().includes(element) || recipe.ingredients[i].ingredient.toLowerCase().includes(element));
						}
					});

					indexCreation(newRecipes);
					ingredientSelect.innerHTML = '';
					deviceSelect.innerHTML = '';
					ustensilSelect.innerHTML = '';

					//Update options tags with 
					let ingredientsOptions = [];
					let devicesOptions = [];
					let ustensilsOptions = [];
					recoveryDataTags(newRecipes, ingredientsOptions, devicesOptions, ustensilsOptions);

					let uniqueIngOptions = [];
					let uniqueDevOptions = [];
					let uniqueUstOptions = [];	
					optionsSelectInput(uniqueIngOptions, uniqueDevOptions, uniqueUstOptions, ingredientsOptions, devicesOptions, ustensilsOptions);

					if(newRecipes.length == 0){
						main.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc.';
					}

					//Recipes filtered with new tags
					let option = [];
					let newrecipesTagsFilter = [];
					filterTags(newRecipes, option, newrecipesTagsFilter);
	
				}else{
					//Reset recipes
					main.innerHTML = '';
					indexCreation(recipes);
	
					//Reset options tags
					ingredientSelect.innerHTML = '';
					deviceSelect.innerHTML = '';
					ustensilSelect.innerHTML = '';
	
					recoveryDataTags(recipes, ingredientsOptions, devicesOptions, ustensilsOptions);
					optionsSelectInput(uniqueIngOptions, uniqueDevOptions, uniqueUstOptions, ingredientsOptions, devicesOptions, ustensilsOptions);
					filterTags(recipes, element, recipesTagsFilter);
				}
			});	
		};
		algoSearch();
		
		/////////////////////////////////////TAGS FILTER/////////////////////////////////////
		
		//Creation tags 
		let ingredientSelect = document.createElement('select');
		let deviceSelect = document.createElement('select');
		let ustensilSelect = document.createElement('select');
		ingredientSelect.id = 'ingredients';
		deviceSelect.id = 'appareil';
		ustensilSelect.id = 'ustensiles';
		let arraySelects = [ingredientSelect, deviceSelect, ustensilSelect];

		selectContainer.appendChild(ingredientSelect);
		selectContainer.appendChild(deviceSelect);
		selectContainer.appendChild(ustensilSelect);

		let ingredientsOptions = [];
		let devicesOptions = [];
		let ustensilsOptions = [];

		//Creation options tags
		let recoveryDataTags = (recipes, ingredientsOptions, devicesOptions, ustensilsOptions) => {
			//Data ingredients
			recipes.forEach(recipe => recipe.ingredients.map(ingredient => ingredientsOptions.push(ingredient.ingredient)));
			//Data devices
			recipes.forEach(recipe => devicesOptions.push(recipe.appliance));
			//Data devices
			recipes.forEach(recipe => recipe.ustensils.map(ustensil => ustensilsOptions.push(ustensil)));
		};
		recoveryDataTags(recipes, ingredientsOptions, devicesOptions, ustensilsOptions);

		let uniqueIngOptions = [];
		let uniqueDevOptions = [];
		let uniqueUstOptions = [];	
		
		let optionsSelectInput = (uniqueIngOptions, uniqueDevOptions, uniqueUstOptions, ingredientsOptions, devicesOptions, ustensilsOptions) => {
			uniqueIngOptions = [...new Set(ingredientsOptions)];
			uniqueDevOptions = [...new Set(devicesOptions)];
			uniqueUstOptions = [...new Set(ustensilsOptions)];	

			let titleIngredient = document.createElement('option');
			titleIngredient.innerHTML = 'Ingrédients';
			ingredientSelect.appendChild(titleIngredient);

			let titleDevices = document.createElement('option');
			titleDevices.innerHTML = 'Appareil';
			deviceSelect.appendChild(titleDevices);

			let titleUstensils = document.createElement('option');
			titleUstensils.innerHTML = 'Ustensiles';
			ustensilSelect.appendChild(titleUstensils);

			uniqueIngOptions.forEach(ingredient => {
				let option = document.createElement('option');
				option.innerHTML = ingredient;
				ingredientSelect.appendChild(option);
			});
			uniqueDevOptions.forEach(device => {
				let option = document.createElement('option');
				option.innerHTML = device;
				deviceSelect.appendChild(option);
			});
			uniqueUstOptions.forEach(ustensil => {
				let option = document.createElement('option');
				option.innerHTML = ustensil;
				ustensilSelect.appendChild(option);
			});
		};
		optionsSelectInput(uniqueIngOptions, uniqueDevOptions, uniqueUstOptions, ingredientsOptions, devicesOptions, ustensilsOptions);
		
		let element = [];
		let recipesTagsFilter = [];

		let filterTags = (recipes, element, recipesTagsFilter) => {
			arraySelects.forEach(select => {
				select.addEventListener('change', e => {
					main.innerHTML ='';

					if(element.indexOf(e.currentTarget.value) === -1){
						element.push(e.currentTarget.value);
					}else{
						element.pop();
					}
					
					let tag = document.createElement('span');
					tag.classList.add('tag');
					tag.innerHTML = element;
					tagContainer.appendChild(tag);

					recipesTagsFilter = recipes.filter(recipe => 
						element.every(elt => {
							for(let i=0; i<recipe.ingredients.length; i++){
								return (recipe.ustensils.includes(elt) || recipe.appliance.includes(elt) ||  recipe.ingredients.some(ingredient => ingredient.ingredient.includes(elt)));
							}
						}) 
					);
					indexCreation(recipesTagsFilter);
					
				});
			});
		};
		filterTags(recipes, element, recipesTagsFilter);
	});

