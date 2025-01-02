// navbar toggle 

document.addEventListener('DOMContentLoaded', function () {
    var navOpenButton = document.getElementById('navOpen');
    var navCloseButton = document.getElementById('navClose');
    var navMenu = document.getElementById('navMenu');

    navOpenButton.addEventListener('click', function () {
        navCloseButton.classList.add('md:hidden');
        navCloseButton.classList.remove('hidden')
        navOpenButton.classList.add('hidden');
        navOpenButton.classList.remove('md:hidden')


        navMenu.classList.add('overflow-visible');
        navMenu.classList.add('visible');
        navMenu.classList.add('h-screen');
        navMenu.classList.add('ease-in-out');
        navMenu.classList.add('duration-500');

        navMenu.classList.remove('h-0')
        navMenu.classList.remove('overflow-hidden')
        navMenu.classList.remove('invisible')
    });

    navCloseButton.addEventListener('click', function () {
        navCloseButton.classList.add('hidden');
        navCloseButton.classList.remove('md:hidden')
        navOpenButton.classList.add('md:hidden');
        navOpenButton.classList.remove('hidden')

        navMenu.classList.remove('overflow-visible');
        navMenu.classList.remove('visible');
        navMenu.classList.remove('h-screen');

        navMenu.classList.add('ease-in-out');
        navMenu.classList.add('duration-500');

        navMenu.classList.add('h-0')
        navMenu.classList.add('overflow-hidden')
        navMenu.classList.add('invisible')
    });
});



// hero slider 
let sliderImageIndex = 0;
showHeroSlider();

function showHeroSlider(){
    let i;
    let sliderItem = document.getElementsByClassName("hero-slider-item")
    let sliderNav = document.getElementsByClassName("sliderDot");
    for (i = 0; i < sliderItem.length; i++) {
        sliderItem[i].style.display = "none";  
    }
    sliderImageIndex++;
    if (sliderImageIndex > sliderItem.length) {sliderImageIndex = 1}    
    for (i = 0; i < sliderNav.length; i++) {
        sliderNav[i].className.replace("active", "");
    }

    sliderItem[sliderImageIndex-1].style.display = "block";  
    sliderNav[sliderImageIndex-1].className += " active";
    setTimeout(showHeroSlider, 5000); // Change image every 5 seconds
    
}


// review carousel 
const wrapper = document.querySelector(".carousel-wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".carousel-wrapper .arrow");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


// copyright 

document.getElementById('copyright').innerHTML = `© ${new Date().getFullYear()} Copyright <a class="text-secondary" href="/">Utshob Trading </a> All Rights Reserved.`