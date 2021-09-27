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
					let event = e.currentTarget.value.toLowerCase();
				
					let newRecipes = recipes.filter(recipe => {
						for(let i=0; i<recipe.ingredients.length;i++){
							return (recipe.name.toLowerCase().includes(event) || recipe.description.toLowerCase().includes(event) || recipe.ingredients[i].ingredient.toLowerCase().includes(event));
						}
					});
					indexCreation(newRecipes);
					ingredientSelect.innerHTML = '';
					deviceSelect.innerHTML = '';
					ustensilSelect.innerHTML = '';

					//Update options tags 
					let ingredientsOptions = [];
					let devicesOptions = [];
					let ustensilsOptions = [];
					recoveryDataTags(newRecipes, ingredientsOptions, devicesOptions, ustensilsOptions);

					let uniqueIngOptions = [];
					let uniqueDevOptions= [];
					let uniqueUstOptions= [];	
					optionsSelectInput(uniqueIngOptions, uniqueDevOptions, uniqueUstOptions, ingredientsOptions, devicesOptions, ustensilsOptions);

					//Recipes filtered with new tags
					let newRecipesTagsFilter = [];
					filterTags(newRecipes, element, newRecipesTagsFilter);
					
					//Case of no result
					if(newRecipes.length == 0){
						main.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc.';
					}

				}else{
					//Reset recipes
					main.innerHTML = '';
					indexCreation(recipes);
	
					//Reset options tags
					ingredientSelect.innerHTML = '';
					deviceSelect.innerHTML = '';
					ustensilSelect.innerHTML = '';
	
					// recoveryDataTags(recipes, ingredientsOptions, devicesOptions, ustensilsOptions);
					optionsSelectInput(uniqueIngOptions, uniqueDevOptions, uniqueUstOptions, ingredientsOptions, devicesOptions, ustensilsOptions);
					filterTags(recipes, element, recipesTagsFilter);
				}
			});	
		};
		algoSearch();
		
		/////////////////////////////////////TAGS FILTER/////////////////////////////////////
		
		//Creation select for tags 
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

		//Recovery data for options tags
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

		//Creation options tags
		let optionsSelectInput = (uniqueIngOptions, uniqueDevOptions, uniqueUstOptions, ingredientsOptions, devicesOptions, ustensilsOptions) => {
			uniqueIngOptions = [...new Set(ingredientsOptions)];
			uniqueDevOptions = [...new Set(devicesOptions)];
			uniqueUstOptions = [...new Set(ustensilsOptions)];	

			let titleIngredient = document.createElement('option');
			titleIngredient.value = '';
			titleIngredient.innerHTML = 'Ingrédients';
			ingredientSelect.prepend(titleIngredient);

			let titleDevices = document.createElement('option');
			titleDevices.value = '';
			titleDevices.innerHTML = 'Appareil';
			deviceSelect.prepend(titleDevices);

			let titleUstensils = document.createElement('option');
			titleUstensils.value = '';
			titleUstensils.innerHTML = 'Ustensiles';
			ustensilSelect.prepend(titleUstensils);

			uniqueIngOptions.forEach(ingredient => {
				let option = document.createElement('option');
				option.value = ingredient;
				option.innerHTML = ingredient;
				ingredientSelect.appendChild(option);
			});
			uniqueDevOptions.forEach(device => {
				let option = document.createElement('option');
				option.value = device;
				option.innerHTML = device;
				deviceSelect.appendChild(option);
			});
			uniqueUstOptions.forEach(ustensil => {
				let option = document.createElement('option');
				option.value = ustensil;
				option.innerHTML = ustensil;
				ustensilSelect.appendChild(option);
			});
		};
		optionsSelectInput(uniqueIngOptions, uniqueDevOptions, uniqueUstOptions, ingredientsOptions, devicesOptions, ustensilsOptions);
		
		let element = [];
		let recipesTagsFilter = [];
		let tag = [];

		//Filter recipes with options tags
		let filterTags = (recipes, element, recipesTagsFilter) => {
			arraySelects.forEach(select => {
				select.addEventListener('input', ev => {
					main.innerHTML ='';

					//Creation span tag + styles 
					if(element.indexOf(ev.currentTarget.value) === -1 && ev.currentTarget.value != ''){
						element.push(ev.currentTarget.value);

						tag = document.createElement('span');
						tag.classList.add('tag');
						tag.innerHTML = ev.currentTarget.value;
						tagContainer.appendChild(tag);

						tag.innerHTML += '<i class=\'far fa-times-circle\'></i>';
						
						recipes.forEach(recipe => {
							for(let i=0; i<recipe.ingredients.length; i++){
								if(recipe.ustensils.includes(ev.currentTarget.value)){
									tag.style.color = '#FFFFFF';
									tag.style.backgroundColor = '#ED6454';
								}
								if(recipe.appliance.includes(ev.currentTarget.value)){
									tag.style.color = '#FFFFFF';
									tag.style.backgroundColor = '#68D9A4';
								}
								if(recipe.ingredients.some(ingredient => ingredient.ingredient.includes(ev.currentTarget.value))){
									tag.style.color = '#FFFFFF';
									tag.style.backgroundColor = '#3282F7';
								}
							}
						});
					}
					
					recipesTagsFilter = recipes.filter(recipe => 
						element.every(elt => {
							for(let i=0; i<recipe.ingredients.length; i++){
								return (recipe.ustensils.includes(elt) || recipe.appliance.includes(elt) ||  recipe.ingredients.some(ingredient => ingredient.ingredient.includes(elt)));
							}
						}) 
					);
					indexCreation(recipesTagsFilter);
					ingredientSelect.innerHTML = '';
					deviceSelect.innerHTML = '';
					ustensilSelect.innerHTML = '';

					//Update options tags with 
					let ingredientsOptionsTags = [];
					let devicesOptionsTags = [];
					let ustensilsOptionsTags = [];
					recoveryDataTags(recipesTagsFilter, ingredientsOptionsTags, devicesOptionsTags, ustensilsOptionsTags);

					let uniqueUstOptionsTags = [];
					let uniqueDevOptionsTags = [];
					let uniqueIngOptionsTags = [];
					optionsSelectInput(uniqueIngOptionsTags, uniqueDevOptionsTags, uniqueUstOptionsTags, ingredientsOptionsTags, devicesOptionsTags, ustensilsOptionsTags);
				});
			});
		};
		filterTags(recipes, element, recipesTagsFilter);
	});

