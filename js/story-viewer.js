/*=========================================
        FEATURED STORIES AUTO SLIDER
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const storyCards = document.querySelectorAll(".story-card");

    storyCards.forEach(card => {

        const img = card.querySelector(".story-slider");
        const folder = card.dataset.folder;

        let current = 1;
        let timer;

        function changeImage() {

    current++;

    if (current > 10) current = 1;

    img.classList.add("fade");

    setTimeout(() => {

        img.src = `assets/images/featured/${folder}/${current}.jpg`;

        img.onload = () => {

            img.classList.remove("fade");

        };

    }, 300);

}

        timer = setInterval(changeImage, 3000);

        card.addEventListener("mouseenter", () => {

            clearInterval(timer);

        });

        card.addEventListener("mouseleave", () => {

            timer = setInterval(changeImage, 3000);

        });

    });

});
