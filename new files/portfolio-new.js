/*==================================================
    PICTURE PALACE PRODUCTIONS
    PORTFOLIO.JS
    PART 1
    GALLERY ENGINE
==================================================*/


/*==================================================
    DOM ELEMENTS
==================================================*/

const galleryCards = document.querySelectorAll(".gallery-card");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const counter = document.getElementById("counter");
const galleryTitle = document.getElementById("galleryTitle");
const thumbnailContainer = document.getElementById("thumbnailContainer");


/*==================================================
    GALLERY STATE
==================================================*/

let galleryFolder = "";

let galleryPath = "portfolio";

let currentImage = 1;

let totalImages = 25;


/*==================================================
    GALLERY TITLES
==================================================*/

const galleryTitles = {

    wedding: "Wedding",

    prewedding: "Pre Wedding",

    engagement: "Engagement",

    baby: "Baby Shoot",

    candid: "Candid",

    events: "Events"

};


/*==================================================
    OPEN GALLERY
==================================================*/

function openGallery(folder, path = "portfolio", total = 25) {

    galleryFolder = folder;

    galleryPath = path;

    totalImages = total;

    currentImage = 1;

    updateImage();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


/*==================================================
    UPDATE IMAGE
==================================================*/

function updateImage() {

    lightboxImage.classList.add("fade");

    setTimeout(() => {

        lightboxImage.src =
            `assets/images/${galleryPath}/${galleryFolder}/${currentImage}.jpg`;

        counter.textContent =
            `${currentImage} / ${totalImages}`;


        galleryTitle.textContent =

            galleryPath === "featured"

                ? `${galleryTitles[galleryFolder]} Story`

                : galleryTitles[galleryFolder];


        createThumbnails();

        lightboxImage.onload = () => {

            lightboxImage.classList.remove("fade");

        };

    }, 180);

}


/*==================================================
    OPEN FROM PORTFOLIO
==================================================*/

galleryCards.forEach(card => {

    card.addEventListener("click", () => {

        openGallery(

            card.dataset.folder,

            "portfolio",

            25

        );

    });

});
/*==================================================
    PART 2
    THUMBNAILS & LIGHTBOX NAVIGATION
==================================================*/


/*==================================================
    CREATE THUMBNAILS
==================================================*/

function createThumbnails() {

    if (!thumbnailContainer) return;

    thumbnailContainer.innerHTML = "";

    for (let i = 1; i <= totalImages; i++) {

        const thumb = document.createElement("img");

        thumb.src =
            `assets/images/${galleryPath}/${galleryFolder}/${i}.jpg`;

        thumb.className = "thumb";

        thumb.loading = "lazy";

        if (i === currentImage) {

            thumb.classList.add("active");

        }

        thumb.addEventListener("click", () => {

            currentImage = i;

            updateImage();

        });

        thumbnailContainer.appendChild(thumb);

    }

}


/*==================================================
    NEXT IMAGE
==================================================*/

function nextImage() {

    currentImage++;

    if (currentImage > totalImages) {

        currentImage = 1;

    }

    updateImage();

}


/*==================================================
    PREVIOUS IMAGE
==================================================*/

function previousImage() {

    currentImage--;

    if (currentImage < 1) {

        currentImage = totalImages;

    }

    updateImage();

}


/*==================================================
    CLOSE GALLERY
==================================================*/

function closeGallery() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


/*==================================================
    BUTTON EVENTS
==================================================*/

if (nextBtn) {

    nextBtn.addEventListener("click", nextImage);

}

if (prevBtn) {

    prevBtn.addEventListener("click", previousImage);

}

if (closeBtn) {

    closeBtn.addEventListener("click", closeGallery);

}


/*==================================================
    CLICK OUTSIDE TO CLOSE
==================================================*/

if (lightbox) {

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            closeGallery();

        }

    });

}


/*==================================================
    KEYBOARD CONTROLS
==================================================*/

document.addEventListener("keydown", (event) => {

    if (!lightbox || !lightbox.classList.contains("active")) return;

    switch (event.key) {

        case "ArrowRight":

            nextImage();

            break;

        case "ArrowLeft":

            previousImage();

            break;

        case "Escape":

            closeGallery();

            break;

    }

});


/*==================================================
    MOBILE SWIPE
==================================================*/

let touchStartX = 0;

if (lightbox) {

    lightbox.addEventListener("touchstart", (event) => {

        touchStartX = event.changedTouches[0].clientX;

    });

    lightbox.addEventListener("touchend", (event) => {

        const touchEndX = event.changedTouches[0].clientX;

        if (touchStartX - touchEndX > 60) {

            nextImage();

        }

        if (touchEndX - touchStartX > 60) {

            previousImage();

        }

    });

}
/*==================================================
    PART 3
    PORTFOLIO FILTER
    & FEATURED STORIES
==================================================*/


/*==================================================
    DOM ELEMENTS
==================================================*/

const filterButtons = document.querySelectorAll(".filter-btn");

const storyCards = document.querySelectorAll(".story-card");


/*==================================================
    PORTFOLIO FILTER
==================================================*/

if (filterButtons.length && galleryCards.length) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelector(".filter-btn.active")
                ?.classList.remove("active");

            button.classList.add("active");

            const filter = button.dataset.filter;

            galleryCards.forEach(card => {

                const visible =

                    filter === "all" ||

                    card.dataset.category === filter;

                card.classList.toggle("hide", !visible);

            });

        });

    });

}


/*==================================================
    FEATURED STORIES
==================================================*/

if (storyCards.length) {

    storyCards.forEach(card => {

        card.addEventListener("click", () => {

            openGallery(

                card.dataset.folder,

                "featured",

                10

            );

        });

    });

}
/*==================================================
    PART 4
    PICTURE PALACE ALBUM VIEWER
==================================================*/


/*==================================================
    DOM ELEMENTS
==================================================*/

const albumCards = document.querySelectorAll(".ppAlbumCard");

const albumViewer = document.getElementById("ppAlbumViewer");

const albumImages = document.getElementById("ppAlbumImages");

const albumTitle = document.getElementById("ppAlbumTitle");

const albumClose = document.getElementById("ppAlbumClose");


/*==================================================
    OPEN ALBUM
==================================================*/

function openAlbumViewer(folder, title) {

    if (
        !albumViewer ||
        !albumImages ||
        !albumTitle
    ) return;

    albumTitle.textContent = title;

    albumImages.innerHTML = "";

    for (let i = 1; i <= 10; i++) {

        const image = document.createElement("img");

        const number = String(i).padStart(2, "0");

        image.src = `assets/albums/${folder}/${number}.jpg`;

        image.alt = `${title} ${number}`;

        image.loading = "lazy";

        albumImages.appendChild(image);

    }

    albumViewer.classList.add("active");

    document.body.classList.add("ppNoScroll");

    albumViewer.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/*==================================================
    CLOSE ALBUM
==================================================*/

function closeAlbumViewer() {

    if (!albumViewer) return;

    albumViewer.classList.remove("active");

    document.body.classList.remove("ppNoScroll");

    albumImages.innerHTML = "";

}


/*==================================================
    OPEN EVENTS
==================================================*/

if (albumCards.length) {

    albumCards.forEach(card => {

        card.addEventListener("click", () => {

            openAlbumViewer(

                card.dataset.folder,

                card.querySelector("h3").textContent

            );

        });

    });

}


/*==================================================
    CLOSE BUTTON
==================================================*/

if (albumClose) {

    albumClose.addEventListener(

        "click",

        closeAlbumViewer

    );

}


/*==================================================
    CLICK OUTSIDE
==================================================*/

if (albumViewer) {

    albumViewer.addEventListener("click", event => {

        if (event.target === albumViewer) {

            closeAlbumViewer();

        }

    });

}


/*==================================================
    ESC KEY
==================================================*/

document.addEventListener("keydown", event => {

    if (!albumViewer) return;

    if (

        albumViewer.classList.contains("active") &&

        event.key === "Escape"

    ) {

        closeAlbumViewer();

    }

});
/*==================================================
    PART 5
    FINAL OPTIMIZATION
==================================================*/


/*==================================================
    GLOBAL ESC KEY HANDLER
==================================================*/

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    if (
        lightbox &&
        lightbox.classList.contains("active")
    ) {

        closeGallery();

        return;
    }

    if (
        albumViewer &&
        albumViewer.classList.contains("active")
    ) {

        closeAlbumViewer();

    }

});


/*==================================================
    PRELOAD NEXT IMAGE
==================================================*/

function preloadNextImage() {

    const next =
        currentImage >= totalImages
            ? 1
            : currentImage + 1;

    const preload = new Image();

    preload.src =
        `assets/images/${galleryPath}/${galleryFolder}/${next}.jpg`;

}


/*==================================================
    UPDATE IMAGE OVERRIDE
==================================================*/

const originalUpdateImage = updateImage;

updateImage = function () {

    originalUpdateImage();

    preloadNextImage();

};


/*==================================================
    SAFE IMAGE FALLBACK
==================================================*/

if (lightboxImage) {

    lightboxImage.addEventListener("error", () => {

        console.warn(

            "Image not found:",

            lightboxImage.src

        );

    });

}


/*==================================================
    SAFE ALBUM IMAGE FALLBACK
==================================================*/

document.addEventListener("error", (event) => {

    if (

        event.target.tagName === "IMG" &&

        event.target.closest("#ppAlbumImages")

    ) {

        console.warn(

            "Album image missing:",

            event.target.src

        );

    }

}, true);


/*==================================================
    INITIALIZATION
==================================================*/

console.log(

    "%cPicture Palace Productions",

    "color:#d4af37;font-size:16px;font-weight:bold;"

);

console.log(

    "%cPortfolio Gallery Loaded Successfully",

    "color:#00b894;font-size:13px;"

);
