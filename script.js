// API = 93331eef

const search = document.querySelector(`input`)
const form = document.getElementById('form');
const mainContainer = document.getElementById('main-container')

form.addEventListener('submit', renderMovies)
document.getElementById('main').addEventListener('click', addMovieToList)


async function renderMovies(e) {
    e.preventDefault();
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=93331eef&s=${search.value}`)
        const data = await response.json();

        let promises = data.Search.map(movie => {
            return fetch(`https://www.omdbapi.com/?apikey=93331eef&i=${movie.imdbID}`).then(resp => resp.json())
        })

        const result = await Promise.all(promises)

        mainContainer.innerHTML = renderHTML(result);
    }
    catch (error) {
        mainContainer.innerHTML = `
            <h2 class="failed-search-heading">Unable to find what you’re looking for. Please try another search.</h2>
        `
    }
}

function renderHTML(result) {
    let html = "";
    for(let data of result) {
        html += 
            `
                <div class="movies">
                    <div class="poster"><img class="poster-img" src="${data.Poster}" alt="movie poster"></div>
                    <div class="movie-info">
                        <div class="first-container">
                            <h2>${data.Title}</h2>
                            <p class="rating">${data.imdbRating} ⭐</p>
                        </div>
                        <div class="second-container">
                            <p>${data.Runtime}</p>
                            <p>${data.Genre}</p>
                            <button id="watchlist" data-id="${data.imdbID}" class="watchlist" type="button"><img src="images/Icon-2.png" alt="watchlist icon."> Watchlist</button>
                        </div>
                        <p class="description">${data.Plot}</p>
                    </div>
                </div>
            `
    }
    return html;
}


function addMovieToList(e) {
    const btn = e.target.closest(".watchlist")
    if(!btn) return ;
    let id = btn.dataset.id
    const currentArr = JSON.parse(localStorage.getItem("watchlist")) || [];
    if(!currentArr.includes(id)) {
        currentArr.push(id);
    }
    localStorage.setItem("watchlist", JSON.stringify(currentArr))
}


