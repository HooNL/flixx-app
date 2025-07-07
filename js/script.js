
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



const fetchData = async (endpoint) => {
  const baseUrl = 'https://api.themoviedb.org/3/' // Example base URL
  // Import API configuration
  const apiKey = '7f8dc4a1d91ab7668681c5e28438336c'
  const response = await fetch(
    `${baseUrl}${endpoint}?api_key=${apiKey}&language=en-US`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await response.json()
  return data
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
      console.log("Shows Page")
      break
    case "/movie-details.html":
      // Movie Details Page
      console.log("Movie Details Page")
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
