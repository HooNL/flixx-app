// Global Current Variables
const global = {
  currentPage: window.location.pathname,
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
      console.log("Home Page")
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
