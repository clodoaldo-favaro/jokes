async function getCategories() {
	const response = await fetch('https://v2.jokeapi.dev/categories');
	const categoriesObj = await response.json();
	return categoriesObj.categories.filter(category => category != 'Any');
}

async function fetchRandomJokeByCategoryThen(category) {
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

async function loadContent() {
	displayLoading();
	const categories = await getCategories();
	addCategoriesToList(categories);
	const response = await loadJokes(categories);
	hideLoading();
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

async function loadJokes(categories) {
	let categoriesPromisesArr = categories.map((category) => {
		return getJoke(category)
	});

	return Promise.all(categoriesPromisesArr);
}

function getJoke(category) {
	return fetchRandomJokeByCategoryThen(category)
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
