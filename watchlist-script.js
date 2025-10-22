
renderWatchlist();
document.getElementById('main').addEventListener('click', removeFromWatchlist);

async function renderWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist"))
    console.log(watchlist)


    const promises = watchlist.map(movie => { 
        return fetch(`https://www.omdbapi.com/?apikey=93331eef&i=${movie}`).then(resp => resp.json());
    })

    const movies = await Promise.all(promises);

    document.getElementById('main-container').innerHTML = renderHTML(movies);
    }

function renderHTML(movies) {
    let watchlistHTML = "";
    for(let data of movies) {
        watchlistHTML += `
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
                            <button id="watchlist" data-id="${data.imdbID}" class="watchlist" type="button"><img src="images/Icon-3.png" alt="watchlist icon."> Remove</button>
                        </div>
                        <p class="description">${data.Plot}</p>
                    </div>
                </div>
            `
    }
    return watchlistHTML;
}


function removeFromWatchlist(e) {
    const btn = e.target.closest(".watchlist")
    if(btn) {
        let id = btn.dataset.id;
        let currentArr = JSON.parse(localStorage.getItem("watchlist")) || [];
        currentArr = currentArr.filter(function (movie) {
            return movie != btn.dataset.id;
        })
        localStorage.setItem("watchlist", JSON.stringify(currentArr));
        renderWatchlist();
    }
}

 
