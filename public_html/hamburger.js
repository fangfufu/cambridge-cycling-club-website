/* Cambridge Cycling Club - Modern Navigation & Menu Interactivity */

function toggleMobileMenu() {
  var header = document.querySelector('.site-header');
  var btn = document.getElementById('mobileMenuBtn');
  if (!header) return;
  var isOpen = header.classList.toggle('nav-open');
  if (btn) {
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.innerHTML = isOpen ? '<i class="fa fa-times"></i>' : '<i class="fa fa-bars"></i>';
  }
}

// Backward compatibility alias for legacy myFunction()
function myFunction() {
  toggleMobileMenu();
}

function initNavInteractions() {
  var btn = document.getElementById('mobileMenuBtn');
  if (btn && !btn.dataset.initialized) {
    btn.dataset.initialized = 'true';
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Handle accordion submenus on mobile / touch
  var dropBtns = document.querySelectorAll('.has-dropdown > .nav-dropdown-btn');
  dropBtns.forEach(function(b) {
    if (!b.dataset.initialized) {
      b.dataset.initialized = 'true';
      b.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          e.stopPropagation();
          var parent = this.parentElement;
          var wasOpen = parent.classList.contains('dropdown-open');
          
          // Close other open submenus
          document.querySelectorAll('.has-dropdown.dropdown-open').forEach(function(el) {
            if (el !== parent) {
              el.classList.remove('dropdown-open');
              var childBtn = el.querySelector('.nav-dropdown-btn');
              if (childBtn) childBtn.setAttribute('aria-expanded', 'false');
            }
          });

          parent.classList.toggle('dropdown-open', !wasOpen);
          this.setAttribute('aria-expanded', !wasOpen ? 'true' : 'false');
        }
      });
    }
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var header = document.querySelector('.site-header');
      if (header && header.classList.contains('nav-open')) {
        toggleMobileMenu();
      }
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    var header = document.querySelector('.site-header');
    if (header && header.classList.contains('nav-open')) {
      if (!header.contains(e.target)) {
        toggleMobileMenu();
      }
    }
  });
}

// Initialize on DOMContentLoaded and watch for async w3-include-html mutations
document.addEventListener('DOMContentLoaded', initNavInteractions);

if (window.MutationObserver) {
  var navObserver = new MutationObserver(function(mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].addedNodes.length > 0) {
        initNavInteractions();
        break;
      }
    }
  });
  navObserver.observe(document.documentElement, { childList: true, subtree: true });
}
