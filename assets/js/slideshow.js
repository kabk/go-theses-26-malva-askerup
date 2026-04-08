document.addEventListener('DOMContentLoaded', function () {
  const slides = Array.from(document.querySelectorAll('.slideshow-slide'));
  const prevZone = document.querySelector('.slideshow-prev');
  const nextZone = document.querySelector('.slideshow-next');
  const caption = document.querySelector('.slideshow-caption span');
  const counter = document.querySelector('.slideshow-counter');

  let currentIndex = 0;

  function positionCounter() {
    if (!counter) return;
    const img = slides[currentIndex].querySelector('img');
    if (!img) return;
    const rect = img.getBoundingClientRect();
    counter.style.top = (rect.bottom + 4) + 'px';
    counter.style.left = rect.right + 'px';
    counter.style.transform = 'translateX(-100%)';
    counter.style.bottom = 'auto';
    counter.style.right = 'auto';
  }

  function showSlide(index) {
    if (!slides.length) return;
    slides[currentIndex].classList.remove('active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    if (caption) caption.innerHTML = slides[currentIndex].dataset.caption || '';
    if (counter) counter.textContent = `(${currentIndex + 1}/${slides.length})`;
    const img = slides[currentIndex].querySelector('img');
    if (img && img.complete) positionCounter();
    else if (img) img.addEventListener('load', positionCounter, { once: true });
  }

  if (prevZone) prevZone.addEventListener('click', () => showSlide(currentIndex - 1));
  if (nextZone) nextZone.addEventListener('click', () => showSlide(currentIndex + 1));

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
  });

  // Ensure first slide is visible on load
  if (slides.length) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === 0));
    if (counter) counter.textContent = `(1/${slides.length})`;
    const firstImg = slides[0].querySelector('img');
    if (firstImg && firstImg.complete) positionCounter();
    else if (firstImg) firstImg.addEventListener('load', positionCounter, { once: true });
  }

  window.addEventListener('resize', positionCounter);
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