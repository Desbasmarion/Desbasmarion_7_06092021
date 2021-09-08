fetch('../data/recipes.json')
	.then(response => response.json())
	.then(data => {

		//Creation recipes block
		let arrayData = data.recipes;
		let main = document.createElement('main');
		
		arrayData.forEach(element => {
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
	});
	
