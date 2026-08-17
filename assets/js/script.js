


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

// Not every page has a popup (the essay/reader pages like introduction.html
// don't). Guard all of this on both elements actually existing — without
// this, popupClose.addEventListener() threw on those pages and silently
// killed every script below it on the page, including the corner-nav and
// header-title collision fixes further down this file.
if (popup && popupClose) {
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
    if (e.target === popup) popup.style.display = "none";
  });
}

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

// The home-button icon sits fixed in the top-left corner. The header title
// is centered and wraps at whatever width it needs, so a long title's first
// line can end up starting close to (or under) the icon on narrow phones —
// how close depends on the exact title text and viewport width, not just
// one or the other. Rather than guess a fixed breakpoint (which either
// leaves narrow phones unprotected or forces unnecessarily short lines on
// wider ones — both of which happened here before), measure the actual
// rendered lines against the actual icon position, and only narrow the
// title (symmetrically, so it stays centered) when a real collision would
// occur.
//
// Two different pages use two different title markups: most pages use
// #header-title directly in <header>, but the essay/reader pages (e.g.
// introduction.html, sadie-plant.html) put their title in <header><nav><ul>
// <li><a>. Both already render as a centered, wrapping block on mobile
// (see the `header nav ul li a` rule below), so the same fix applies to
// either — just need to find whichever one is actually on the page.
function updateHeaderTitleLayout() {
  const title =
    document.getElementById("header-title") ||
    document.querySelector("header nav ul li a");
  const homeButton = document.querySelector(".home-button");
  if (!title || !homeButton) return;

  title.style.maxWidth = ""; // measure from the natural (unconstrained) wrap
  title.style.marginInline = "";

  const buffer = 16; // minimum breathing room, in px
  const homeRect = homeButton.getBoundingClientRect();
  const titleRect = title.getBoundingClientRect(); // natural width == "100%"

  // Check every rendered line (not just the title's overall box), since
  // only whichever line sits at the icon's height actually matters.
  const range = document.createRange();
  range.selectNodeContents(title);
  const lineRects = Array.from(range.getClientRects());

  const needsClearance = lineRects.some((r) => {
    const verticalOverlap = r.top < homeRect.bottom && r.bottom > homeRect.top;
    return verticalOverlap && r.left < homeRect.right + buffer;
  });

  if (needsClearance) {
    const neededLeft = homeRect.right + buffer;
    const newWidth = titleRect.width - 2 * (neededLeft - titleRect.left);
    if (newWidth > 0) {
      title.style.maxWidth = newWidth + "px";
      title.style.marginInline = "auto"; // keep it centered at the new width
    }
  }
}

updateHeaderTitleLayout();
window.addEventListener("resize", updateHeaderTitleLayout);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(updateHeaderTitleLayout);
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



