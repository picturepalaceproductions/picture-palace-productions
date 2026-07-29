/*==================================================
    PICTURE PALACE PRODUCTIONS
    SCRIPT.JS
    PART 1
    CORE UI
==================================================*/


/*==================================================
    DOM ELEMENTS
==================================================*/

const loader = document.getElementById("loader");
const progressBar = document.getElementById("progress-bar");
const topButton = document.getElementById("topBtn");

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const menuOverlay = document.querySelector(".menu-overlay");


/*==================================================
    PAGE LOADER
==================================================*/

window.addEventListener("load", () => {

    if (loader) {

        loader.classList.add("hide");

    }

});


/*==================================================
    SCROLL EVENTS
==================================================*/

window.addEventListener("scroll", () => {

    /*==============================
        SCROLL PROGRESS BAR
    ==============================*/

    if (progressBar) {

        const scrollTop = document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = `${progress}%`;

    }


    /*==============================
        SCROLL TO TOP BUTTON
    ==============================*/

    if (topButton) {

        topButton.classList.toggle(

            "show",

            window.scrollY > 500

        );

    }

});


/*==================================================
    SCROLL TO TOP
==================================================*/

if (topButton) {

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/*==================================================
    MOBILE NAVIGATION
==================================================*/

if (menuToggle && navMenu && menuOverlay) {

    const toggleMenu = () => {

        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");

    };

    const closeMenu = () => {

        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

    };


    menuToggle.addEventListener("click", toggleMenu);

    menuOverlay.addEventListener("click", closeMenu);

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

}
/*==================================================
    PART 2
    WHATSAPP & BOOKING POPUP
==================================================*/


/*==================================================
    DOM ELEMENTS
==================================================*/

const whatsappToggle = document.querySelector(".whatsapp-toggle");
const whatsappBox = document.querySelector(".whatsapp-box");

const bookingPopup = document.getElementById("booking-popup");
const bookingButtons = document.querySelectorAll(".book-btn");
const closeBooking = document.getElementById("close-booking");


/*==================================================
    WHATSAPP WIDGET
==================================================*/

if (whatsappToggle && whatsappBox) {

    whatsappToggle.addEventListener("click", () => {

        whatsappBox.classList.toggle("active");

    });

}


/*==================================================
    COMMON POPUP FUNCTIONS
==================================================*/

function lockBody() {

    document.body.style.overflow = "hidden";

}

function unlockBody() {

    document.body.style.overflow = "";

}


function openPopup(popup) {

    if (!popup) return;

    popup.style.display = "flex";

    popup.classList.add("active");

    lockBody();

}


function closePopup(popup) {

    if (!popup) return;

    popup.classList.remove("active");

    popup.style.display = "none";

    unlockBody();

}


/*==================================================
    BOOKING POPUP
==================================================*/

if (bookingPopup && closeBooking && bookingButtons.length) {

    bookingButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            openPopup(bookingPopup);

        });

    });

    closeBooking.addEventListener("click", () => {

        closePopup(bookingPopup);

    });

    bookingPopup.addEventListener("click", event => {

        if (event.target === bookingPopup) {

            closePopup(bookingPopup);

        }

    });

}
/*==================================================
    PART 3
    CONTACT FORM & EMAILJS
==================================================*/


/*==================================================
    DOM ELEMENTS
==================================================*/

const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");


/*==================================================
    SUCCESS TOAST
==================================================*/

function showToast() {

    if (!toast) return;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}


/*==================================================
    SEND EMAIL
==================================================*/

function sendEnquiry(data) {

    return emailjs.send(

        "service_iozyxf9",
        "template_tukpxul",
        data

    );

}


/*==================================================
    CONTACT FORM
==================================================*/

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const params = {

            title: "New Website Enquiry",

            name: document.getElementById("name").value.trim(),

            email: document.getElementById("email").value.trim(),

            message: `Name : ${document.getElementById("name").value}

Phone : ${document.getElementById("phone").value}

Email : ${document.getElementById("email").value}

Event Type : ${document.getElementById("event").value}

Event Date : ${document.getElementById("date").value}

Message :

${document.getElementById("message").value}`

        };

        try {

            await sendEnquiry(params);

            showToast();

            contactForm.reset();

        }

        catch (error) {

            console.error("EMAILJS ERROR :", error);

            alert("❌ Failed to send enquiry. Please try again.");

        }

    });

}
/*==================================================
    PART 4
    BTS LIGHTBOX
==================================================*/


/*==================================================
    DOM ELEMENTS
==================================================*/

const btsItems = document.querySelectorAll(".bts-item img");

const btsLightbox = document.querySelector(".bts-lightbox");

const btsPreview = document.getElementById("bts-preview");

const btsClose = document.querySelector(".bts-close");

const btsPrev = document.querySelector(".bts-prev");

const btsNext = document.querySelector(".bts-next");


/*==================================================
    BTS LIGHTBOX
==================================================*/

if (

    btsItems.length &&
    btsLightbox &&
    btsPreview &&
    btsClose &&
    btsPrev &&
    btsNext

) {

    let currentImage = 0;


    /*----------------------------------
        UPDATE IMAGE
    ----------------------------------*/

    const updateImage = () => {

        btsPreview.src = btsItems[currentImage].src;

    };


    /*----------------------------------
        OPEN GALLERY
    ----------------------------------*/

    const openGallery = (index) => {

        currentImage = index;

        updateImage();

        openPopup(btsLightbox);

    };


    /*----------------------------------
        CLOSE GALLERY
    ----------------------------------*/

    const closeGallery = () => {

        closePopup(btsLightbox);

    };


    /*----------------------------------
        NEXT IMAGE
    ----------------------------------*/

    const nextImage = () => {

        currentImage = (currentImage + 1) % btsItems.length;

        updateImage();

    };


    /*----------------------------------
        PREVIOUS IMAGE
    ----------------------------------*/

    const previousImage = () => {

        currentImage =

            (currentImage - 1 + btsItems.length) %

            btsItems.length;

        updateImage();

    };


    /*----------------------------------
        OPEN IMAGE
    ----------------------------------*/

    btsItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            openGallery(index);

        });

    });


    /*----------------------------------
        BUTTON EVENTS
    ----------------------------------*/

    btsClose.addEventListener(

        "click",

        closeGallery

    );

    btsNext.addEventListener(

        "click",

        nextImage

    );

    btsPrev.addEventListener(

        "click",

        previousImage

    );


    /*----------------------------------
        CLICK OUTSIDE
    ----------------------------------*/

    btsLightbox.addEventListener("click", (event) => {

        if (event.target === btsLightbox) {

            closeGallery();

        }

    });


    /*----------------------------------
        KEYBOARD CONTROLS
    ----------------------------------*/

    document.addEventListener("keydown", (event) => {

        if (!btsLightbox.classList.contains("active")) return;

        switch (event.key) {

            case "Escape":

                closeGallery();

                break;

            case "ArrowRight":

                nextImage();

                break;

            case "ArrowLeft":

                previousImage();

                break;

        }

    });

}
/*==================================================
    PART 5
    YOUTUBE VIDEO POPUP
==================================================*/


/*==================================================
    DOM ELEMENTS
==================================================*/

const filmCards = document.querySelectorAll(".film-card");

const videoPopup = document.getElementById("videoPopup");

const youtubePlayer = document.getElementById("youtubePlayer");

const closeVideo = document.getElementById("closeVideo");


/*==================================================
    YOUTUBE VIDEO POPUP
==================================================*/

if (

    filmCards.length &&
    videoPopup &&
    youtubePlayer &&
    closeVideo

) {

    /*----------------------------------
        OPEN VIDEO
    ----------------------------------*/

    const openVideo = (videoUrl) => {

        youtubePlayer.src = videoUrl;

        openPopup(videoPopup);

    };


    /*----------------------------------
        CLOSE VIDEO
    ----------------------------------*/

    const closeVideoPopup = () => {

        youtubePlayer.src = "";

        closePopup(videoPopup);

    };


    /*----------------------------------
        OPEN VIDEO ON CARD CLICK
    ----------------------------------*/

    filmCards.forEach(card => {

        card.addEventListener("click", () => {

            const videoUrl = card.dataset.video;

            if (!videoUrl) return;

            openVideo(videoUrl);

        });

    });


    /*----------------------------------
        CLOSE BUTTON
    ----------------------------------*/

    closeVideo.addEventListener(

        "click",

        closeVideoPopup

    );


    /*----------------------------------
        CLICK OUTSIDE TO CLOSE
    ----------------------------------*/

    videoPopup.addEventListener("click", (event) => {

        if (event.target === videoPopup) {

            closeVideoPopup();

        }

    });


    /*----------------------------------
        KEYBOARD CONTROLS
    ----------------------------------*/

    document.addEventListener("keydown", (event) => {

        if (!videoPopup.classList.contains("active")) return;

        if (event.key === "Escape") {

            closeVideoPopup();

        }

    });

}
