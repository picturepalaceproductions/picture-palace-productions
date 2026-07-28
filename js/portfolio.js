//==========================================
// Picture Palace Productions Portfolio Gallery
//==========================================

const cards = document.querySelectorAll(".gallery-card");

const lightbox = document.getElementById("lightbox");
const image = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const counter = document.getElementById("counter");
const galleryTitle = document.getElementById("galleryTitle");
const thumbnailContainer = document.getElementById("thumbnailContainer");

let folder = "";
let current = 1;

let galleryPath = "portfolio";
let total = 25;

//---------------- Open Gallery ----------------//

cards.forEach(card => {

    card.addEventListener("click", () => {

        galleryPath = "portfolio";
        total = 25;

        folder = card.dataset.folder;
        current = 1;

        showImage();

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";

    });

});

function showImage() {

    image.classList.add("fade");

    setTimeout(() => {

        image.src = `assets/images/${galleryPath}/${folder}/${current}.jpg`;
        

        counter.textContent = `${current} / ${total}`;

        const titles = {

    wedding: galleryPath === "featured"
        ? "Wedding Story"
        : "Wedding",

    prewedding: galleryPath === "featured"
        ? "Pre Wedding Story"
        : "Pre Wedding",

    engagement: galleryPath === "featured"
        ? "Engagement Story"
        : "Engagement",

    baby: "Baby Shoot",

    candid: "Candid",

    events: "Events"

};

        galleryTitle.textContent = titles[folder];

        createThumbnails();

        image.onload = () => {

            image.classList.remove("fade");

        };

    }, 180);

}
function createThumbnails(){

    thumbnailContainer.innerHTML="";

    for(let i=1;i<=total;i++){

        const thumb=document.createElement("img");

        thumb.src=`assets/images/${galleryPath}/${folder}/${i}.jpg`;

        thumb.className="thumb";

        if(i===current){

            thumb.classList.add("active");

        }

        thumb.onclick=()=>{

            current=i;

            showImage();

            createThumbnails();

        };

        thumbnailContainer.appendChild(thumb);

    }

}
//---------------- Next ----------------//

nextBtn.addEventListener("click", () => {

    current++;

    if (current > total) current = 1;

    showImage();

});

//---------------- Previous ----------------//

prevBtn.addEventListener("click", () => {

    current--;

    if (current < 1) current = total;

    showImage();

});

//---------------- Close ----------------//

function closeGallery() {

    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", closeGallery);

lightbox.addEventListener("click", e => {

    if (e.target === lightbox) {

        closeGallery();

    }

});

//---------------- Keyboard ----------------//

document.addEventListener("keydown", e => {

    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowRight") nextBtn.click();

    if (e.key === "ArrowLeft") prevBtn.click();

    if (e.key === "Escape") closeGallery();

});

//---------------- Mobile Swipe ----------------//

let startX = 0;

lightbox.addEventListener("touchstart", e => {

    startX = e.changedTouches[0].clientX;

});

lightbox.addEventListener("touchend", e => {

    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 60) nextBtn.click();

    if (endX - startX > 60) prevBtn.click();

});
//----------------------------------------
// Premium Portfolio Filter
//----------------------------------------

const filterBtns=document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.querySelector(".filter-btn.active")
        .classList.remove("active");

        btn.classList.add("active");

        const filter=btn.dataset.filter;

        cards.forEach(card=>{

            if(filter==="all"){

                card.classList.remove("hide");

            }

            else if(card.dataset.category===filter){

                card.classList.remove("hide");

            }

            else{

                card.classList.add("hide");

            }

        });

    });

});
//----------------------------------------
// Featured Stories Viewer
//----------------------------------------

const storyCards = document.querySelectorAll(".story-card");

storyCards.forEach(card => {

    card.addEventListener("click", () => {

        galleryPath = "featured";
        total = 10;

        folder = card.dataset.folder;
        current = 1;

        showImage();

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";

    });

});
/* ==========================================
   Picture Palace Album Viewer
========================================== */

const albumCards = document.querySelectorAll(".ppAlbumCard");

const albumViewer = document.getElementById("ppAlbumViewer");

const albumImages = document.getElementById("ppAlbumImages");

const albumTitle = document.getElementById("ppAlbumTitle");

const albumClose = document.getElementById("ppAlbumClose");
/* ==========================================
   Close Gallery with ESC Key
========================================== */

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        // Gallery बंद करें
        ppAlbumGallery.classList.remove("active");
        document.body.classList.remove("ppNoScroll");

        // Images साफ करें
        ppGalleryImages.innerHTML = "";

    }

});


albumCards.forEach(card=>{

    card.addEventListener("click",()=>{

        const folder=card.dataset.folder;

        const title=card.querySelector("h3").innerText;

        albumTitle.innerText=title;

        albumImages.innerHTML="";

        /* Load 01.jpg - 10.jpg */

        for(let i=1;i<=10;i++){

            const img=document.createElement("img");

            const num=String(i).padStart(2,"0");

            img.src=`assets/albums/${folder}/${num}.jpg`;

            img.loading="lazy";

            img.alt=title+" "+num;

            albumImages.appendChild(img);

        }

        albumViewer.classList.add("active");
        document.body.classList.add("ppNoScroll");

        albumViewer.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    });

});


albumClose.addEventListener("click",()=>{

    albumViewer.classList.remove("active");
    document.body.classList.remove("ppNoScroll");

    albumImages.innerHTML="";

});
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        const viewer = document.getElementById("ppAlbumViewer");
        const gallery = document.getElementById("ppAlbumGallery");

        if (viewer) {
            viewer.classList.remove("active");
            document.body.classList.remove("ppNoScroll");
        }

        if (gallery) {
            gallery.classList.remove("active");
            document.body.classList.remove("ppNoScroll");
        }

        const albumImages = document.getElementById("ppAlbumImages");
        const galleryImages = document.getElementById("ppGalleryImages");

        if (albumImages) {
            albumImages.innerHTML = "";
        }

        if (galleryImages) {
            galleryImages.innerHTML = "";
        }

    }

});
/* ==========================================
   Close Viewer When Clicking Outside
========================================== */

albumViewer.addEventListener("click", function (e) {

    // अगर Background पर क्लिक हुआ हो
    if (e.target === albumViewer) {

        albumViewer.classList.remove("active");

        albumImages.innerHTML = "";

    }

});