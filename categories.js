function fetchCategoriesPromisesThen() {
	return fetch('https://v2.jokeapi.dev/categories');
}

function fetchRandomJokeByCategoryThen(category) {
	return fetch('https://v2.jokeapi.dev/joke/' + category)
}

function displayLoading() {
	const loading = document.getElementById('loading_message');
	loading.classList.remove('hidden');
}

function hideLoading() {
	const loading = document.getElementById('loading_message');
	loading.classList.add('hidden');
}

function loadContent() {
	displayLoading();
	fetchCategoriesPromisesThen()
		.then(response => response.json())
		.then(jsonObj => {
			const categories = jsonObj.categories.filter(cat => cat != 'Any');
			addCategoriesToList(categories);
			loadJokes(categories);
			hideLoading();
		});
}

function addCategoriesToList(categories) {
	const categoriesList = document.getElementById('categories_list');
	categories.forEach((category) => {
		const listItem = document.createElement('li');
		const anchor = document.createElement('h2');
		const jokeList = document.createElement('ul');
		jokeList.id = category + '_jokes';
		anchor.innerHTML = category;
		listItem.append(anchor);
		listItem.append(jokeList);
		categoriesList.append(listItem);
	});
}

function loadJokes(categories) {
	categories.forEach((category) => {
		getJoke(category)
	})
}

function getJoke(category) {
	fetchRandomJokeByCategoryThen(category)
		.then(response => response.json())
		.then(jsonObj => {
			addJokeToList(jsonObj);
		})
}

function addJokeToList(jokeObj) {
	const jokesList = document.getElementById(jokeObj.category + '_jokes');
	const jokeListItem = document.createElement('li');
	jokeListItem.innerHTML = jokeObj.type === 'single' ? jokeObj.joke : `${jokeObj.setup} ${jokeObj.delivery}`;
	jokesList.append(jokeListItem);
}

export { loadContent };
