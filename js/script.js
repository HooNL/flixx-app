// Global Current Variables
const global = {
  currentPage: window.location.pathname,
}

// Display Populare Movies
const displayPopularMovies = async () => {
  const { results } = await fetchData("movie/popular")

  results.forEach((movie) => {
    const div = document.createElement("div")
    div.classList.add("card")

    div.innerHTML = ` 
          <a href="movie-details.html?id=${movie.id}">
           ${
             movie.poster_path
               ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">`
               : `<img src="../images/no-image.jpg" class="card-img-top" alt="${movie.title}">`
           }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `

    document.querySelector("#popular-movies").appendChild(div)
  })
}

// Display TV Shows
const displayPopularShows = async () => {
  const { results } = await fetchData("tv/popular")

  results.forEach((show) => {
    const div = document.createElement("div")
    div.classList.add("card")

    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
           ${
             show.poster_path
               ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}">`
               : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.name}">`
           }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>
        `

    document.querySelector("#popular-shows").appendChild(div)
  })
}

// Display Movie Details
const displayMovieDetails = async () => {
  const movieId = new URLSearchParams(window.location.search).get("id")
  if (!movieId) {
    console.error("Movie ID not found in URL")
    return
  }
  const movie = await fetchData(`movie/${movieId}`)
  const div = document.createElement("div")
  div.classList.add("movie-details")
  div.innerHTML = `   <div class="details-top">
          <div>
            ${
              movie.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`
                : `<img src="../images/no-image.jpg" alt="${movie.title}">`
            }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
                ${movie.overview ? movie.overview : "No overview available."}
            </p>
       
        <div class='blokInfo'>
          <div class="list-group">       
            <h5 class="text-secondary">Genres</h5>
            <ul >
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
          </div>
          <div class="list-group"> 
           <h5 class="text-secondary">Languages</h5>
            <ul >
                ${movie.spoken_languages
                  .map((lang) => `<li>${lang.name}</li>`)
                  .join("")}
            </ul>
           </div>
        </div>
            <a href="${
              movie.homepage
            }" rel="noopener noreferrer" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> ${
              movie.budget ? `$${addCommas(movie.budget)}` : "N/A"
            }</li>
            <li><span class="text-secondary">Revenue:</span> ${
              movie.revenue ? `$${addCommas(movie.revenue)}` : "N/A"
            }</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime ? `${movie.runtime} minutes` : "N/A"
            }</li>
            <li><span class="text-secondary">Status:</span> ${
              movie.status ? movie.status : "N/A"
            } -  ${movie.release_date ? movie.release_date : "N/A"}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => ` <span>${company.name}</span>`)}</div>
        </div>`

  // console.log(movie);

  document.querySelector("#movie-details").appendChild(div)
}

// Fetch Data from API
const fetchData = async (endpoint) => {
  const baseUrl = "https://api.themoviedb.org/3/" // Example base URL
  // Import API configuration
  const apiKey = "7f8dc4a1d91ab7668681c5e28438336c"

  showSpinner(true)

  const response = await fetch(
    `${baseUrl}${endpoint}?api_key=${apiKey}&language=en-US`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await response.json()
  showSpinner(false)
  return data
}

// Create a function to handle spinner display
const showSpinner = (show) => {
  const spinner = document.querySelector(".spinner")
  !show ? spinner.classList.remove("show") : spinner.classList.add("show")
}

// Highlight the current page in the navigation
const highlightActiveLink = () => {
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
}

// Add Commas To Numbers
const addCommas = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

// Initialize the application
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      // Home Page
      displayPopularMovies()
      break
    case "/shows.html":
      // Shows Page
      displayPopularShows()
      break
    case "/movie-details.html":
      // Movie Details Page
      displayMovieDetails()
      break
    case "/tv-details.html":
      // TV Details Page
      console.log("TV Details Page")
      break
    case "/search.html":
      // Search Page
      console.log("Search Page")
      break
  }
  highlightActiveLink()
}

// Event Listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", init)
