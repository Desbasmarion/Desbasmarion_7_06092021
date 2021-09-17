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
					<p aria-label="instructions">
					${element.description}
					</p>
				</div>`;
	
				let ul = document.createElement('ul');
				element.ingredients.forEach(ingredient => {
					//Gerer le cas d'absence de quantity et/ou unit 
					// let unit = [];
					// unit.innerHTML = `${ingredient.unit}`;
					// if(unit.innerHTML == undefined) {
					// 	unit.innerHTML = '';
					// }

					// let quantity = [];
					// quantity.innerHTML = `:${ingredient.quantity}`;
					// if(quantity.innerHTML == undefined){
					// 	quantity.innerHTML = '';
					// }
					
					let li = document.createElement('li');
					li.innerHTML += `${ingredient.ingredient} ${ingredient.quantity} ${ingredient.unit}`;
					ul.appendChild(li);
					article.append(ul);
				});
				
				main.appendChild(article);
				document.body.appendChild(main);			
			});
			
		};

		//Call the function to create index page
		indexCreation(recipes);

		let dataTitle = [];
		//let dataIngredient = [];
		let dataDescription = [];

		//Retrieve data needed to compare to the user input
		for(let i=0; i<recipes.length; i++){
			dataTitle.push(recipes[i].name.toLowerCase());
			dataDescription.push(recipes[i].description.toLowerCase());
			//recipes[i].ingredients.forEach(ingredient => dataIngredient.push(ingredient.ingredient.toLowerCase()));
		}
		
		let allData = dataTitle.concat(dataDescription);
		let arrayFilter = [];
		let newArray = [];
		let uniqueArray = [];

		//Comparison between name data and user input
		let input = document.querySelector('#searchArea');

		input.addEventListener('input', () => {
			if(input.value.length >= 3){
				main.innerHTML = '';
				for(let i=0; i<allData.length; i++){
					if(allData[i].includes(input.value.toLowerCase())){
						arrayFilter.push(allData[i]);
					}
					
				}
				for(let i=0; i<recipes.length; i++){
					arrayFilter.forEach(element => {
						if(recipes[i].name.toLowerCase().includes(element)){
							newArray.push(recipes[i]);
						}else if(recipes[i].description.toLowerCase().includes(element)){
							newArray.push(recipes[i]);
						}
					});
				}
				//Removal of duplicates
				let uniqueSet = new Set(newArray);
				uniqueArray = Array.from(uniqueSet);
		
				//Creation index page with recipes filtered
				indexCreation(uniqueArray);
				arrayFilter.splice(0, arrayFilter.length);
				newArray.splice(0, newArray.length);
				
			}else{
				main.innerHTML = '';
				indexCreation(recipes);
			}
		});	
	})
	.catch(err => console.log(err));
