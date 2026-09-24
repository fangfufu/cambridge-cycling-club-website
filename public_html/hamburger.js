/* Toggles navigation and mobile dropdowns */

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (!x) return;
  if (x.classList.contains("responsive")) {
    x.classList.remove("responsive");
  } else {
    x.classList.add("responsive");
  }
}

// Add touch/click support for dropdowns on mobile
document.addEventListener("DOMContentLoaded", function() {
  var dropBtns = document.querySelectorAll(".dropdown .dropbtn");
  dropBtns.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        var content = this.nextElementSibling;
        if (content && content.classList.contains("dropdown-content")) {
          var isShown = content.style.display === "block";
          // Close others
          document.querySelectorAll(".dropdown-content").forEach(function(el) {
            el.style.display = "";
          });
          content.style.display = isShown ? "none" : "block";
        }
      }
    });
  });
});
