// Function to load HTML components
function loadComponent(elementId, componentPath) {
  fetch(componentPath)
    .then(response => response.text())
    .then(html => {
      document.getElementById(elementId).innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading component:', error);
    });
}

// Load components when the document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Load navigation
  loadComponent('nav-container', '/components/nav.html');
  
  // Load footer
  loadComponent('footer-container', '/components/footer.html');
}); 