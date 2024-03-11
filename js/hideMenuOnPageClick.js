"use strict";

const navbarToggler = document.querySelector('.navbar-toggler');
const navbarSupportedContent = document.getElementById('navbarSupportedContent');
const formSearch = document.querySelector('.form-search');

navbarToggler.addEventListener('click', function () {
    document.body.addEventListener('click', function (e) {
        if (navbarSupportedContent.classList.contains('show') && e.target != formSearch) {
            setTimeout(() => {
                navbarSupportedContent.classList.remove('show');
            }, 200);
        }
    });
})