


// we make sure the JavaScript file loads after our HTML by using a function test if the HTML is loaded

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}   



docReady(function() {

	// functions
	// go
	// here

});


const popup = document.getElementById("popup");
const popupClose = document.getElementById("popup-close");

// Any element with .js-open-popup opens the popup — this covers both the
// #header-title link and the new "(about)" link in the corner nav.
const popupTriggers = document.querySelectorAll(".js-open-popup");

popupTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "flex";
  });
});

popupClose.addEventListener("click", () => {
  popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
  if(e.target === popup) popup.style.display = "none";
});

// Underline whichever corner-nav link points at the page you're on
document.querySelectorAll(".corner-nav a[href]").forEach((link) => {
  const href = link.getAttribute("href");
  if (href && href !== "#" && location.pathname.endsWith(href)) {
    link.classList.add("current");
  }
});

// The corner-nav stays fixed on the same line as the header title, pinned
// to the same right: 1rem corner in both states. If the title is long
// enough (or the window narrow enough) that the two would actually touch,
// drop the nav to its own line just under the title — still fixed, still
// right-aligned to that same corner, just at a lower `top`. This checks
// real rendered widths instead of guessing a breakpoint, since every
// page's title is a different length.
function updateCornerNavLayout() {
  const title = document.getElementById("header-title");
  const nav = document.querySelector(".corner-nav");
  if (!title || !nav) return;

  nav.classList.remove("wrap-below"); // measure from the "normal" state
  nav.style.top = ""; // ...and its default (CSS) position
  document.body.style.paddingTop = ""; // ...and the page's default top spacing

  const titleRect = title.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  const buffer = 24; // minimum breathing room, in px

  if (titleRect.right + buffer > navRect.left) {
    const gap = 8;
    nav.classList.add("wrap-below");
    nav.style.top = titleRect.bottom + gap + "px";

    // The nav is fixed (doesn't push page content on its own), so once it
    // drops below the title, the page needs extra top spacing to clear
    // both lines — otherwise content like the gossip-bar ends up under it.
    const navHeight = nav.getBoundingClientRect().height;
    document.body.style.paddingTop = titleRect.bottom + gap + navHeight + gap + "px";
  }
}

updateCornerNavLayout();
window.addEventListener("resize", updateCornerNavLayout);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(updateCornerNavLayout);
}


const images = document.querySelectorAll(".toggle-image");

images.forEach(img => {
  const original = img.src;
  const alternate = img.dataset.alt;

  let toggled = false;

  img.addEventListener("click", function (e) {
    e.preventDefault();

    if (!alternate) return;

    img.src = toggled ? original : alternate;
    toggled = !toggled;
  });
});



