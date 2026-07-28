// ================= HERO SLIDER =================

const slides = document.querySelectorAll(".hero-slider img");

let current = 0;

function heroSlider(){

    slides[current].classList.remove("active");

    current++;

    if(current >= slides.length){

        current = 0;

    }

    slides[current].classList.add("active");

}

setInterval(heroSlider,5000);
/* ===========================
BOOKING POPUP
=========================== */

const bookingPopup = document.getElementById("booking-popup");

const bookButtons = document.querySelectorAll(".book-btn");

const closeBooking = document.getElementById("close-booking");

bookButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        bookingPopup.style.display="flex";

    });

});

closeBooking.addEventListener("click",()=>{

    bookingPopup.style.display="none";

});

bookingPopup.addEventListener("click",(e)=>{

    if(e.target===bookingPopup){

        bookingPopup.style.display="none";

    }

});
const lightbox = document.getElementById("storyLightbox");
const lightboxImg = document.getElementById("storyLightboxImg");
const closeBtn = document.querySelector(".story-close");

document.querySelectorAll(".story-slider").forEach(img=>{

    img.style.cursor="zoom-in";

    img.addEventListener("click",()=>{

        lightbox.style.display="flex";

        lightboxImg.src=img.src;

    });

});

closeBtn.addEventListener("click",()=>{

    lightbox.style.display="none";

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        lightbox.style.display="none";

    }

});
document.querySelectorAll(".story-card").forEach(card => {

    card.addEventListener("click", () => {

        alert("Clicked");

    });

});