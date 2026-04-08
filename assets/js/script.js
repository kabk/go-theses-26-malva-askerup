


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


const headerTitle = document.getElementById("header-title");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("popup-close");

headerTitle.addEventListener("click", (e) => {
  e.preventDefault();
  popup.style.display = "flex";
});

popupClose.addEventListener("click", () => {
  popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
  if(e.target === popup) popup.style.display = "none";
});


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


