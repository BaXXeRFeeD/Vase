import "../sass/main.scss";

import Swiper from 'swiper';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Autoplay, Navigation, Pagination} from "swiper/modules";

const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    speed: 500,
    effect: 'slide',

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    scrollbar: {
        el: '.swiper-scrollbar',
    },

    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1920: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    }
});

swiper.on('slideChange', function () {
    console.log('slide changed');
});

const navMenu = document.querySelector('.nav-menu');

document.querySelector('.menu-toggle').addEventListener('click', function() {
    navMenu.classList.add('nav-menu--active');
    navMenu.classList.remove('nav-menu--closing');
});

const menuClose = document.querySelector('.nav-menu__close');

menuClose.addEventListener('click', function() {
    navMenu.classList.add('nav-menu--closing');
    setTimeout(() => {
        navMenu.classList.remove('nav-menu--closing');
        navMenu.classList.remove('nav-menu--active');
    }, 400);
});