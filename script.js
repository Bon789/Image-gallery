const images        = document.querySelectorAll(".gallery img");
const lightbox      = document.querySelector(".lightbox");
const lightboxImg   = lightbox.querySelector("img");
const closeBtn      = document.querySelector(".close-btn");
const prevBtn       = document.querySelector(".prev-btn");
const nextBtn       = document.querySelector(".next-btn");

let currentIndex = 0;

// Open lightbox
function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
}

// Navigation
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
}
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
}

// Click on thumbnails
images.forEach((img, i) => {
    img.addEventListener("click", () => openLightbox(i));
});

// Buttons & outside click
closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Keyboard
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft")  prevImage();
    if (e.key === "Escape")     closeLightbox();
});

// TOUCH SWIPE (mobile)
let touchStartX = 0, touchStartY = 0;
lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

lightbox.addEventListener("touchend", (e) => {
    if (!lightbox.classList.contains("show")) return;
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
        deltaX > 0 ? prevImage() : nextImage();
    } else if (Math.abs(deltaY) > threshold) {
        closeLightbox();
    }
}, { passive: true });
