//==============================
// WhatsApp Widget
//==============================

const whatsappToggle = document.querySelector(".whatsapp-toggle");
const whatsappBox = document.querySelector(".whatsapp-box");

if (whatsappToggle && whatsappBox) {

    whatsappToggle.addEventListener("click", () => {

        whatsappBox.classList.toggle("active");

    });

}
//==============================
// Page Loader
//==============================

window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    if(loader){

        loader.classList.add("hide");

    }

});
//==============================
// Scroll Progress
//==============================

window.addEventListener("scroll",()=>{

    let winScroll=document.documentElement.scrollTop;

    let height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

    let progress=(winScroll/height)*100;

    const progressBar=document.getElementById("progress-bar");

if(progressBar){

    progressBar.style.width=progress+"%";

}

});
//==============================
// Scroll To Top
//==============================

const topBtn=document.getElementById("topBtn");

if(topBtn){

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topBtn.classList.add("show");

    }else{

        topBtn.classList.remove("show");

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

}
//==============================
// Mobile Navigation
//==============================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const menuOverlay = document.querySelector(".menu-overlay");


if(menuToggle && navMenu){


    menuToggle.addEventListener("click",()=>{


        menuToggle.classList.toggle("active");

        navMenu.classList.toggle("active");


        if(menuOverlay){

            menuOverlay.classList.toggle("active");

        }


    });



    if(menuOverlay){

        menuOverlay.addEventListener("click",()=>{


            menuToggle.classList.remove("active");

            navMenu.classList.remove("active");

            menuOverlay.classList.remove("active");


        });


    }


    navMenu.querySelectorAll("a").forEach(link=>{


        link.addEventListener("click",()=>{


            menuToggle.classList.remove("active");

            navMenu.classList.remove("active");


            if(menuOverlay){

                menuOverlay.classList.remove("active");

            }


        });


    });


}

/* ===========================
BOOKING POPUP
=========================== */

document.addEventListener("DOMContentLoaded", function () {

    const bookingPopup = document.getElementById("booking-popup");
    const closeBooking = document.getElementById("close-booking");
    const bookButtons = document.querySelectorAll(".book-btn");

    if (!bookingPopup || !closeBooking || bookButtons.length === 0) {
        return;
    }

    bookButtons.forEach(button => {

        button.addEventListener("click", function (e) {

            e.preventDefault();
            bookingPopup.style.display = "flex";

        });

    });

    closeBooking.addEventListener("click", function () {

        bookingPopup.style.display = "none";

    });

    bookingPopup.addEventListener("click", function (e) {

        if (e.target === bookingPopup) {

            bookingPopup.style.display = "none";

        }

    });

});
/* ===========================
CONTACT FORM EMAILJS
=========================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const params = {

            title: "New Website Enquiry",

            name: document.getElementById("name").value,

            email: document.getElementById("email").value,

            message:
`Name : ${document.getElementById("name").value}

Phone : ${document.getElementById("phone").value}

Email : ${document.getElementById("email").value}

Event Type : ${document.getElementById("event").value}

Event Date : ${document.getElementById("date").value}

Message :

${document.getElementById("message").value}`

        };

        console.log(params);

        emailjs.send(
            "service_iozyxf9",
            "template_tukpxul",
            params
        )

        .then(function (response) {

            console.log("SUCCESS", response);

            showToast();

            contactForm.reset();

        })

        .catch(function (error) {

            console.error("EMAILJS ERROR:", error);

            alert("❌ Failed to send enquiry. Please try again.");

        });

    });

}
/* ===========================
SUCCESS TOAST
=========================== */

function showToast() {

    const toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 3500);

}
/*=========================================
    BEHIND THE SCENES LIGHTBOX
=========================================*/

const btsItems = document.querySelectorAll(".bts-item img");
const btsLightbox = document.querySelector(".bts-lightbox");
const btsPreview = document.getElementById("bts-preview");

const btsClose = document.querySelector(".bts-close");
const btsPrev = document.querySelector(".bts-prev");
const btsNext = document.querySelector(".bts-next");

if (
    btsItems.length &&
    btsLightbox &&
    btsPreview &&
    btsClose &&
    btsPrev &&
    btsNext
) {

    let currentImage = 0;

    function showImage() {
        btsPreview.src = btsItems[currentImage].src;
    }

    function closeGallery() {
        btsLightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    btsItems.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentImage = index;
            showImage();
            btsLightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    btsClose.addEventListener("click", closeGallery);

    btsNext.addEventListener("click", () => {
        currentImage = (currentImage + 1) % btsItems.length;
        showImage();
    });

    btsPrev.addEventListener("click", () => {
        currentImage = (currentImage - 1 + btsItems.length) % btsItems.length;
        showImage();
    });

    document.addEventListener("keydown", (e) => {
        if (!btsLightbox.classList.contains("active")) return;

        if (e.key === "Escape") closeGallery();
        if (e.key === "ArrowRight") btsNext.click();
        if (e.key === "ArrowLeft") btsPrev.click();
    });

    btsLightbox.addEventListener("click", (e) => {
        if (e.target === btsLightbox) {
            closeGallery();
        }
    });

}
/*==========================
YOUTUBE VIDEO POPUP
==========================*/

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".film-card");
    const popup = document.getElementById("videoPopup");
    const iframe = document.getElementById("youtubePlayer");
    const closeBtn = document.getElementById("closeVideo");

    if (!cards.length || !popup || !iframe || !closeBtn) return;

    // Open Popup
    cards.forEach(card => {

        card.addEventListener("click", function () {

            iframe.src = this.dataset.video;

            popup.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });

    // Close Popup
    function closePopup() {

        popup.classList.remove("active");

        iframe.src = "";

        document.body.style.overflow = "";

    }

    // Close Button
    closeBtn.addEventListener("click", closePopup);

    // Click Outside
    popup.addEventListener("click", function (e) {

        if (e.target === popup) {

            closePopup();

        }

    });

    // ESC Key
    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape" && popup.classList.contains("active")) {

            closePopup();

        }

    });

});
