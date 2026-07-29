/*==================================================
    PICTURE PALACE PRODUCTIONS
    SCRIPT.JS
    PART 1
    Core UI
==================================================*/


/*==================================================
    PAGE LOADER
==================================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.classList.add("hide");

    }

});


/*==================================================
    SCROLL PROGRESS BAR
==================================================*/

const progressBar = document.getElementById("progress-bar");

if (progressBar) {

    window.addEventListener("scroll", () => {

        const scrollTop = document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = `${progress}%`;

    });

}


/*==================================================
    SCROLL TO TOP
==================================================*/

const topButton = document.getElementById("topBtn");

if (topButton) {

    window.addEventListener("scroll", () => {

        topButton.classList.toggle("show", window.scrollY > 500);

    });

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

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const menuOverlay = document.querySelector(".menu-overlay");

if (menuToggle && navMenu && menuOverlay) {

    const closeMenu = () => {

        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

    };

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");

    });

    menuOverlay.addEventListener("click", closeMenu);

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

}
/*==================================================
    PART 2
    WhatsApp • Booking Popup • Success Toast
==================================================*/


/*==================================================
    WHATSAPP WIDGET
==================================================*/

const whatsappToggle = document.querySelector(".whatsapp-toggle");
const whatsappBox = document.querySelector(".whatsapp-box");

if (whatsappToggle && whatsappBox) {

    whatsappToggle.addEventListener("click", () => {

        whatsappBox.classList.toggle("active");

    });

}


/*==================================================
    BOOKING POPUP
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const bookingPopup = document.getElementById("booking-popup");
    const closeBooking = document.getElementById("close-booking");
    const bookingButtons = document.querySelectorAll(".book-btn");

    if (!bookingPopup || !closeBooking || !bookingButtons.length) return;

    const openBooking = () => {

        bookingPopup.style.display = "flex";

        document.body.style.overflow = "hidden";

    };

    const closePopup = () => {

        bookingPopup.style.display = "none";

        document.body.style.overflow = "";

    };

    bookingButtons.forEach(button => {

        button.addEventListener("click", e => {

            e.preventDefault();

            openBooking();

        });

    });

    closeBooking.addEventListener("click", closePopup);

    bookingPopup.addEventListener("click", e => {

        if (e.target === bookingPopup) {

            closePopup();

        }

    });

});


/*==================================================
    SUCCESS TOAST
==================================================*/

function showToast() {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}
/*==================================================
    PART 3
    CONTACT FORM • EMAILJS
==================================================*/


/*==================================================
    CONTACT FORM
==================================================*/

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

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

        emailjs.send(

            "service_iozyxf9",

            "template_tukpxul",

            params

        )

        .then(() => {

            showToast();

            contactForm.reset();

        })

        .catch(error => {

            console.error("EmailJS Error:", error);

            alert("❌ Failed to send enquiry. Please try again.");

        });

    });

}
/*==================================================
    PART 4
    BEHIND THE SCENES LIGHTBOX
==================================================*/

const btsImages = document.querySelectorAll(".bts-item img");
const btsLightbox = document.querySelector(".bts-lightbox");
const btsPreview = document.getElementById("bts-preview");

const btsClose = document.querySelector(".bts-close");
const btsPrev = document.querySelector(".bts-prev");
const btsNext = document.querySelector(".bts-next");

if (
    btsImages.length &&
    btsLightbox &&
    btsPreview &&
    btsClose &&
    btsPrev &&
    btsNext
) {

    let currentIndex = 0;

    const showImage = () => {

        btsPreview.src = btsImages[currentIndex].src;

    };

    const openLightbox = index => {

        currentIndex = index;

        showImage();

        btsLightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    };

    const closeLightbox = () => {

        btsLightbox.classList.remove("active");

        document.body.style.overflow = "";

    };

    const nextImage = () => {

        currentIndex = (currentIndex + 1) % btsImages.length;

        showImage();

    };

    const previousImage = () => {

        currentIndex = (currentIndex - 1 + btsImages.length) % btsImages.length;

        showImage();

    };

    btsImages.forEach((image, index) => {

        image.addEventListener("click", () => openLightbox(index));

    });

    btsClose.addEventListener("click", closeLightbox);

    btsNext.addEventListener("click", nextImage);

    btsPrev.addEventListener("click", previousImage);

    btsLightbox.addEventListener("click", event => {

        if (event.target === btsLightbox) {

            closeLightbox();

        }

    });

    document.addEventListener("keydown", event => {

        if (!btsLightbox.classList.contains("active")) return;

        switch (event.key) {

            case "Escape":
                closeLightbox();
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

document.addEventListener("DOMContentLoaded", () => {

    const filmCards = document.querySelectorAll(".film-card");
    const videoPopup = document.getElementById("videoPopup");
    const youtubePlayer = document.getElementById("youtubePlayer");
    const closeVideo = document.getElementById("closeVideo");

    if (
        !filmCards.length ||
        !videoPopup ||
        !youtubePlayer ||
        !closeVideo
    ) {
        return;
    }

    const openPopup = videoUrl => {

        youtubePlayer.src = videoUrl;

        videoPopup.classList.add("active");

        document.body.style.overflow = "hidden";

    };

    const closePopup = () => {

        videoPopup.classList.remove("active");

        youtubePlayer.src = "";

        document.body.style.overflow = "";

    };

    filmCards.forEach(card => {

        card.addEventListener("click", () => {

            openPopup(card.dataset.video);

        });

    });

    closeVideo.addEventListener("click", closePopup);

    videoPopup.addEventListener("click", event => {

        if (event.target === videoPopup) {

            closePopup();

        }

    });

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            videoPopup.classList.contains("active")
        ) {

            closePopup();

        }

    });

});
