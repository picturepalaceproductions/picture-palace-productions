/*==================================================
    PICTURE PALACE PRODUCTIONS
    SLIDER.JS
    PART 1
    HERO SLIDER
==================================================*/


/*==================================================
    DOM ELEMENTS
==================================================*/

const heroSlides = document.querySelectorAll(".hero-slider img");


/*==================================================
    HERO SLIDER STATE
==================================================*/

let currentSlide = 0;

const sliderInterval = 5000;

let sliderTimer = null;


/*==================================================
    SHOW SLIDE
==================================================*/

function showSlide(index) {

    heroSlides.forEach(slide => {

        slide.classList.remove("active");

    });

    heroSlides[index].classList.add("active");

}


/*==================================================
    NEXT SLIDE
==================================================*/

function nextSlide() {

    currentSlide++;

    if (currentSlide >= heroSlides.length) {

        currentSlide = 0;

    }

    showSlide(currentSlide);

}


/*==================================================
    START SLIDER
==================================================*/

function startSlider() {

    if (heroSlides.length <= 1) return;

    stopSlider();

    sliderTimer = setInterval(

        nextSlide,

        sliderInterval

    );

}


/*==================================================
    STOP SLIDER
==================================================*/

function stopSlider() {

    if (sliderTimer) {

        clearInterval(sliderTimer);

        sliderTimer = null;

    }

}


/*==================================================
    INITIALIZE
==================================================*/

if (heroSlides.length) {

    showSlide(currentSlide);

    startSlider();

}
/*==================================================
    PART 2
    BOOKING POPUP
    & STORY LIGHTBOX
==================================================*/


/*==================================================
    DOM ELEMENTS
==================================================*/

const bookingPopup = document.getElementById("booking-popup");

const bookingButtons = document.querySelectorAll(".book-btn");

const bookingClose = document.getElementById("close-booking");

const storyLightbox = document.getElementById("storyLightbox");

const storyImage = document.getElementById("storyLightboxImg");

const storyClose = document.querySelector(".story-close");

const storyImages = document.querySelectorAll(".story-slider");


/*==================================================
    POPUP HELPERS
==================================================*/

function openPopup(element) {

    if (!element) return;

    element.classList.add("active");

}


function closePopup(element) {

    if (!element) return;

    element.classList.remove("active");

}


/*==================================================
    BOOKING POPUP
==================================================*/

if (bookingPopup) {

    bookingButtons.forEach(button => {

        button.addEventListener("click", () => {

            openPopup(bookingPopup);

        });

    });

}


if (bookingClose) {

    bookingClose.addEventListener(

        "click",

        () => closePopup(bookingPopup)

    );

}


if (bookingPopup) {

    bookingPopup.addEventListener("click", event => {

        if (event.target === bookingPopup) {

            closePopup(bookingPopup);

        }

    });

}


/*==================================================
    STORY LIGHTBOX
==================================================*/

function openStoryLightbox(src) {

    if (!storyLightbox || !storyImage) return;

    storyImage.src = src;

    openPopup(storyLightbox);

}


function closeStoryLightbox() {

    if (!storyLightbox || !storyImage) return;

    storyImage.src = "";

    closePopup(storyLightbox);

}


if (storyImages.length) {

    storyImages.forEach(image => {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {

            openStoryLightbox(image.src);

        });

    });

}


if (storyClose) {

    storyClose.addEventListener(

        "click",

        closeStoryLightbox

    );

}


if (storyLightbox) {

    storyLightbox.addEventListener("click", event => {

        if (event.target === storyLightbox) {

            closeStoryLightbox();

        }

    });

}
/*==================================================
    PART 3
    FINAL OPTIMIZATION
==================================================*/


/*==================================================
    GLOBAL ESC KEY HANDLER
==================================================*/

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;


    /*------------------------------
        CLOSE STORY LIGHTBOX
    ------------------------------*/

    if (
        storyLightbox &&
        storyLightbox.classList.contains("active")
    ) {

        closeStoryLightbox();

        return;

    }


    /*------------------------------
        CLOSE BOOKING POPUP
    ------------------------------*/

    if (
        bookingPopup &&
        bookingPopup.classList.contains("active")
    ) {

        closePopup(bookingPopup);

    }

});


/*==================================================
    PAUSE SLIDER WHEN TAB IS HIDDEN
==================================================*/

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        stopSlider();

    } else {

        startSlider();

    }

});


/*==================================================
    WINDOW FOCUS EVENTS
==================================================*/

window.addEventListener("blur", stopSlider);

window.addEventListener("focus", startSlider);


/*==================================================
    REMOVE TEST CODE
==================================================*/

// Removed:
// alert("Clicked");


/*==================================================
    INITIALIZATION
==================================================*/

console.log(

    "%cPicture Palace Productions",

    "color:#d4af37;font-size:16px;font-weight:bold;"

);

console.log(

    "%cHero Slider Initialized Successfully",

    "color:#00b894;font-size:13px;"

);
