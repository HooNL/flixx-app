// Global Current Variables
const global = {
  currentPage: window.location.pathname,
  api: {
    apiKey: "7f8dc4a1d91ab7668681c5e28438336c",
    baseUrl: "https://api.themoviedb.org/3/",
  },
  search: {
    type: "movie", // "movie" or "tv"
    page: 1,
    term: "",
    totalPages: 0,
    totalResults: 0,
    results: [],
    query: "",
  },
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

  displayBackgroundImage("movie", movie.backdrop_path)

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
          <div class="list-group">${movie.production_companies.map(
            (company) => ` <span>${company.name}</span>`
          )}</div>
        </div>`

  // console.log(movie);

  document.querySelector("#movie-details").appendChild(div)
}

// Display TV Details
const displayTVDetails = async () => {
  const showId = new URLSearchParams(window.location.search).get("id")
  if (!showId) {
    console.error("Show ID not found in URL")
    return
  }
  const show = await fetchData(`tv/${showId}`)
  displayBackgroundImage("show", show.backdrop_path)
  const div = document.createElement("div")
  div.classList.add("show-details")
  div.innerHTML = `<div class="details-top">
        <div>
        ${
          show.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}">`
            : `<img src="../images/no-image.jpg" alt="${show.name}">`
        }
      </div>
      <div>
        <h2>${show.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">First Air Date: ${show.first_air_date}</p>
        <p>
          ${show.overview ? show.overview : "No overview available."}
        </p>
    
      
        <div class='blokInfo'>
            <div class="list-group">
                <h5 class="text-secondary">Genres</h5>
                <ul>
                    ${show.genres
                      .map((genre) => `<li>${genre.name}</li>`)
                      .join("")}
                </ul>
            </div>
            <div class="list-group">
                <h5 class="text-secondary">Languages</h5>
                <ul>
                    ${show.spoken_languages
                      .map((lang) => `<li>${lang.name}</li>`)
                      .join("")} 
                </ul>
                </div>
            </div>
          <div>
            <a href="${
              show.homepage
            }" rel="noopener noreferrer" target="_blank" class="btn">Visit Show Homepage</a>
          </div>    
        </div>
        </div>
        <div class="details-bottom">    
            <h2>Show Info</h2>
            <ul>
                <li><span class="text-secondary">Number of Seasons:</span> ${
                  show.number_of_seasons
                }</li>
                <li><span class="text-secondary">Number of Episodes:</span> ${
                  show.number_of_episodes
                }</li>
                <li><span class="text-secondary">Status:</span> ${
                  show.status ? show.status : "N/A"
                } - ${show.first_air_date ? show.first_air_date : "N/A"}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
                ${show.production_companies
                  .map((company) => `<span>${company.name}</span>`)
                  .join("")}
            </div>
            </div>
        </div>
    </div>
    
    </div>
</div>
    `
  document.querySelector("#show-details").appendChild(div)
}

// Display Background Image On Details Page
const displayBackgroundImage = (type, backgroundPath) => {
  const overlayDiv = document.createElement("div")
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
  overlayDiv.style.backgroundSize = "cover"
  overlayDiv.style.backgroundPosition = "center"
  overlayDiv.style.backgroundRepeat = "no-repeat"
  overlayDiv.style.height = "100vh"
  overlayDiv.style.width = "100%"
  overlayDiv.style.position = "absolute"
  overlayDiv.style.top = "0"
  overlayDiv.style.left = "0"
  overlayDiv.style.zIndex = "-1"
  overlayDiv.style.opacity = "0.2"

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv)
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv)
  }
}

// Displaye Slider Movies
const displaySliderMovies = async () => {
  const { results } = await fetchData("movie/now_playing")
  results.forEach((movie) => {
    const div = document.createElement("div")
    div.classList.add("swiper-slide")
    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    }">
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-primary"></i>
          ${movie.vote_average.toFixed(1)} / 10 
        </h4>
      `
    document.querySelector(".swiper-wrapper").appendChild(div)
  })

  // Initialize Swiper after adding slides
  initSwiper()
}

// Display Swiper
const initSwiper = () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  })
}

// Fetch Data from API
const fetchData = async (endpoint) => {
  const { apiKey, baseUrl } = global.api

  if (!apiKey || !baseUrl) {
    console.error("API key or base URL is missing in the configuration.")
    return
  }

  if (!endpoint) {
    console.error("Endpoint is required to fetch data.")
    return
  }

  // Show spinner while fetching data
  showSpinner(true)

  const response = await fetch(
    `${baseUrl}${endpoint}?api_key=${apiKey}&language=en-US`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await response.json()

  // Hide spinner after fetching data
  showSpinner(false)

  return data
}

// Create Search Functionality
const search = async () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  global.search.type = urlParams.get("type")
  global.search.term = urlParams.get("search-term")

  if (global.search.term !== "" && global.search.term !== null) {
    // If search term is present, fetch the search results
    const { results, total_pages, page, total_results } =
      await fetchSearchResults()
    global.search.page = page
    global.search.totalPages = total_pages
    global.search.totalResults = total_results
    if (results.length === 0) {
      // If no results found, show an alert or handle it accordingly
      showAlert("No results found.")
      return
    }
    displaySearchResults(results)
    document.querySelector("#search-term").value = ""
  } else {
    // If search term is missing, log an error or handle it accordingly
    showAlert("Please enter a search term.")
    return
  }
}

// Fetch Search Results
const fetchSearchResults = async () => {
  const { type, term } = global.search
  if (!type || !term) {
    console.error("Search type or term is missing.")
    return []
  }

  // Show spinner while fetching search results
  showSpinner(true)

  const response = await fetch(
    `${global.api.baseUrl}search/${type}?api_key=${global.api.apiKey}&query=${term}&page=${global.search.page}&language=en-US`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch search results")
  }
  const data = await response.json()
  if (!data || !data.results) {
    console.error("No results found in the search data.")
    return []
  }
  // Hide spinner after fetching search results
  showSpinner(false)
  return data
}

// Display Search Results
const displaySearchResults = (results) => {
  // Clear previous search results
  const searchResultsContainer = document.querySelector("#search-results")
  searchResultsContainer.innerHTML = ""
  const paginationContainer = document.querySelector("#pagination")
  paginationContainer.innerHTML = ""
  const searchResultsHeading = document.querySelector("#search-results-heading")
  searchResultsHeading.textContent = ""

  // Display the search results
  results.forEach((result) => {
    const div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = `
            <a href="${global.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500/${
                    result.poster_path
                  }" class="card-img-top" 
                alt="${
                  global.search.type === "movie" ? result.title : result.name
                }">`
                : `<img src="../images/no-image.jpg" class="card-img-top" alt="${
                    global.search.type === "movie" ? result.title : result.name
                  }">`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${
              global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">  
                <small class="text-muted">Release Date: ${
                  global.search.type === "movie"
                    ? result.release_date
                    : result.first_air_date
                }</small>
                <br>
                <small class="text-muted">Rating: ${result.vote_average.toFixed(
                  1
                )}</small>
                <br>
            </p>
            </div>
        `

    // Display the search results heading
    const searchResultsHeading = document.querySelector(
      "#search-results-heading"
    )
    searchResultsHeading.textContent = `Search Results for "${global.search.term}" (${global.search.totalResults} results)`
    document.querySelector("#search-results").appendChild(div)
  })

  // Display pagination
  displayPagination()
}

// Display Pagination
const displayPagination = () => {
  const paginationDiv = document.createElement("div")
  paginationDiv.classList.add("pagination")
  paginationDiv.innerHTML = `
     <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `

  // Append pagination to the search results container
  document.querySelector("#pagination").appendChild(paginationDiv)

  // Disable buttons if on first or last page
  if (global.search.page === 1) {
    const prevButton = (document.querySelector("#prev").disabled = true)
  }
  if (global.search.page === global.search.totalPages) {
    const nextButton = (document.querySelector("#next").disabled = true)
  }

  // Add event listeners for pagination buttons
  const prevButton = document.querySelector("#prev")
  prevButton.addEventListener("click", async () => {
    const { results, total_pages } = await fetchSearchResults()
    displaySearchResults(results)
    global.search.page--
  })
  const nextButton = document.querySelector("#next")
  nextButton.addEventListener("click", async () => {
    const { results, total_pages } = await fetchSearchResults()
    displaySearchResults(results)
    global.search.page++
  })

  // Previous button
  //   if (global.search.page > 1) {
  //     const prevButton = document.querySelector("#prev")
  //     prevButton.addEventListener("click", () => {
  //       global.search.page--
  //       search()
  //     })
  //   }

  // Next button
  //   if (global.search.page < global.search.totalPages) {
  //     const nextButton = document.querySelector("#next")
  //     nextButton.addEventListener("click", () => {
  //       global.search.page++
  //       search()
  //     })
  //   }

  // Previous button
  //   if (global.search.page > 1) {
  //     const prevButton = createPageButton(global.search.page - 1)
  //     prevButton.textContent = "Prev"
  //     paginationDiv.appendChild(prevButton)
  //   }

  // Next button
  //   if (global.search.page < global.search.totalPages) {
  //     const nextButton = createPageButton(global.search.page + 1)
  //     nextButton.textContent = "Next"
  //     paginationDiv.appendChild(nextButton)
  //   }

  // Page counter
  //   const pageCounter = document.createElement("div")
  //   pageCounter.classList.add("page-counter")
  //   pageCounter.textContent = `Page ${global.search.page} of ${global.search.totalPages}`
  //   paginationDiv.appendChild(pageCounter)
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

// Show an alert message
const showAlert = (message, className = "error") => {
  const alertEl = document.createElement("div")
  alertEl.classList.add("alert", className)
  alertEl.appendChild(document.createTextNode(message))
  alertEl.style.position = "fixed"
  alertEl.style.top = "20px"
  alertEl.style.right = "20px"
  alertEl.style.zIndex = "1000"
  document.querySelector("#alert").appendChild(alertEl)
  setTimeout(() => {
    alertEl.remove()
  }, 3000)
}

// See trending Movies
const seeTrendingMovies = async () => {
  const { results } = await fetchData("trending/movie/day")
  const trendingMoviesContainer = document.querySelector("#trending-movies")
  trendingMoviesContainer.innerHTML = "" // Clear previous content

  results.forEach((movie) => {
    const movieCard = createMovieCard(movie)
    trendingMoviesContainer.appendChild(movieCard)
  })
}
// Create a movie card element
const createMovieCard = (movie) => {
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
  return div
}

// See Person Details
const seePersonDetails = async (personId) => {
  const person = await fetchData(`person/${personId}`)
  const personDetailsContainer = document.querySelector("#person-details")
  const personCard = createPersonCard(person)
  personDetailsContainer.appendChild(personCard)
  // Show spinner while fetching person details
  showSpinner(true)

  // Show spinner after fetching person details
  showSpinner(false)
}

const showPersonDetails = async () => {
  const person = await fetchData(
    `person/${new URLSearchParams(window.location.search).get("id")}`
  )
  if (!person) {
    console.error("Person not found")
    return
  }
  const seePersonDetails = document.createElement("div")
  seePersonDetails.classList.add("person-details")
  seePersonDetails.innerHTML = `
        <div class="details-top">
          <div>
            ${
              person.profile_path
                ? `<img src="https://image.tmdb.org/t/p/w500${person.profile_path}" alt="${person.name}">`
                : `<img src="../images/no-image.jpg" alt="${person.name}">`
            }
          </div>
          <div class="details-info">
            <h2>${person.name}</h2>
            <p><strong>Biography:</strong> ${person.biography}</p>
            <p><strong>Birthday:</strong> ${person.birthday}</p>
            <p><strong>Place of Birth:</strong> ${person.place_of_birth}</p>
            <p><strong>Known For:</strong> ${person.known_for_department}</p>
            <p><strong>Also Known As:</strong> ${person.also_known_as.join(
              ", "
            )}</p>
            <p><strong>Popularity:</strong> ${person.popularity}</p>
            <p><strong>Gender:</strong> ${
              person.gender === 1 ? "Female" : "Male"
            }</p>
            <a href="${
              person.homepage
            }" rel="noopener noreferrer" target="_blank" class="btn">Visit Person Homepage</a>

          </div>
        </div>
       
      `
  document.querySelector("#sh-details").appendChild(seePersonDetails)
}

// Create a person card element
const createPersonCard = (person) => {
  const div = document.createElement("div")
  div.classList.add("card")
  div.innerHTML = `
        <a href="person-details.html?id=${person.id}">
        ${
          person.profile_path
            ? `<img src="https://image.tmdb.org/t/p/w500${person.profile_path}" class="card-img-top" alt="${person.name}">`
            : `<img src="../images/no-image.jpg" class="card-img-top" alt="${person.name}">`
        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${person.name}</h5>
          <p class="card-text">
            <small class="text-muted">Known For: ${
              person.known_for_department
            }</small>
            <br>
            <small class="text-muted">Popularity: ${person.popularity}</small>
            <br>
            <small class="text-muted">Birthday: ${person.birthday}</small>
            <br>
            <small class="text-muted">Place of Birth: ${
              person.place_of_birth
            }</small>
          </p>
        </div>
      `

  return div
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
      displaySliderMovies()
      displayPopularMovies()
      break
    case "/shows.html":
      // Shows Page
      seePersonDetails(123457)

      seeTrendingMovies()
      displayPopularShows()
      break
    case "/movie-details.html":
      // Movie Details Page
      displayMovieDetails()
      break
    case "/tv-details.html":
      // TV Details Page
      displayTVDetails()
      break
    case "/person-details.html":
      // Person Details Page
      showPersonDetails()
      break
    case "/search.html":
      // Search Page
      search()
      break
  }
  highlightActiveLink()
}

// Event Listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", init)
