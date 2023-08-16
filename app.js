document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('search-form');
  const searchButton = document.getElementById('search-button');
  const resultsContainer = document.getElementById('results');

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    searchMovies();
  });

  searchButton.addEventListener('click', searchMovies);
});

function searchMovies() {
  const apiKey = 'YOUR_OMDB_API_KEY';
  const searchInput = document.getElementById('search-input').value;
  const typeSelect = document.getElementById('type-select').value;

  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}&type=${typeSelect}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === 'True') {
        displayResults(data.Search);
      } else {
        resultsContainer.innerHTML = 'Movie not found!';
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

function displayResults(movies) {
  let resultsHTML = '';
  for (const movie of movies) {
    resultsHTML += `<div class="movie">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <p>Type: ${movie.Type}</p>
            <p>Year: ${movie.Year}</p>
            <button class="details-button" data-id="${movie.imdbID}">Details</button>
        </div>`;
  }
  resultsContainer.innerHTML = resultsHTML;

  const detailsButtons = document.querySelectorAll('.details-button');
  detailsButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const imdbID = button.getAttribute('data-id');
      showMovieDetails(imdbID);
    });
  });
}

function showMovieDetails(imdbID) {
  const apiKey = 'YOUR_OMDB_API_KEY';
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((movie) => {
      const detailsHTML = `<div class="details">
                <h2>${movie.Title}</h2>
                <p>Type: ${movie.Type}</p>
                <p>Year: ${movie.Year}</p>
                <p>Plot: ${movie.Plot}</p>
                <p>IMDB Rating: ${movie.imdbRating}</p>
            </div>`;
      resultsContainer.insertAdjacentHTML('beforeend', detailsHTML);
    })
    .catch((error) => {
      console.error('Error fetching movie details:', error);
    });
}
