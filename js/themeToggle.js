"use strict";

let style = document.head.querySelector("style");

function themeToggle() {
    const themeCheckbox = document.querySelector(".theme-check");

    if (document.body.classList.contains("dark-theme__dark-background-body")) {
        themeCheckbox.setAttribute("checked", true);
    }

    themeCheckbox.addEventListener('change', function () {
        const innerText =
            `.dark__theme, input, textarea { background-color: #071e2f !important; color: #ddd2bd; } input::placeholder { color: #1ba098 !important; } .navbar-toggler { background-color: #1ba098; } .btn-dark { --bs-btn-bg: #1ba098; --bs-btn-border-color: #1ba098; --bs-btn-hover-bg: #1ba098; --bs-btn-hover-border-color: #1ba098; --bs-btn-active-bg: #1ba098; --bs-btn-active-border-color: #1ba098; --bs-btn-disabled-bg: #1ba098; --bs-btn-disabled-border-color: #1ba098; color: #ddd2bd; } .btn-outline-success { --bs-btn-color: #1ba098; --bs-btn-border-color: #1ba098; --bs-btn-hover-color: wheat; --bs-btn-hover-bg: #1ba098; --bs-btn-hover-border-color: #1ba098; --bs-btn-active-color: #fff; --bs-btn-active-bg: #1ba098; --bs-btn-active-border-color: #1ba098; --bs-btn-disabled-color: #1ba098; --bs-btn-disabled-border-color: #1ba098; } .btn-outline-success:hover { color: #ddd2bd !important; } .card-settings { background: rgb(2, 8, 13) !important; } .text-body-secondary { color: #deb992 !important; } a { color: #1ba098; } input, textarea { color: #1ba098 !important; } input:hover, textarea:hover { border-color: #06f4e6; } .form-control, ._comments, .form-check-input, .form-check-input:checked { border-color: #1ba098; } .navbar-toggler:focus, .form-select:focus, .form-select:focus-visible, .form-control:focus, .form-control:focus-visible, .form-check-input:focus { border-color: #1ba098 !important; } .navbar-toggler:focus, .form-select:focus, .form-select:focus-visible, .form-control:focus, .form-control:focus-visible, .form-check-input:focus { box-shadow: 0 0 0 .15rem #24dbd0d6; } .card-header-tabs .nav-link.active { background-color: #071e2f; border-color: #051622; border-bottom-color: #071e2f; color: #ddd2bd; } .toggle:hover .toggle-switch:before { box-shadow: 0 0 0 1px #1ba098; } .toggle-checkbox:checked+.toggle-switch { background: #1ba098; } .settings__text{ border-bottom-color: #ddd2bd21; } .submit:hover { background-color: #226a66; border-color: #226a66; color: #ddd2bd; } .form__item ._error { border-color: rgba(244, 106, 106, 0.839); } .contacts__form:after { background-color: #1313138f; background-image: url(../img/loading__dark-theme.svg); } .message__box { background-color: #071e2f; border-color: #1ba098; color: #ddd2bd; } .message__popup { background-color: #585b5861; } .btn-settings:hover, .btn-articles:hover { background-color: #226a66; border-color: #226a66; color: #ddd2bd; }`;

        if (this.checked) {
            console.log("Темная тема включена...");
            document.body.classList.add("dark-theme__color-beige");
            document.body.classList.add("dark-theme__dark-background-body");
            document.querySelector(".form-control").classList.add("dark-theme__dark-background-body");
            document.querySelector(".navbar").classList.add("dark-theme__dark-background-navbar");
            document.querySelector("footer").classList.add("dark-theme__dark-background-footer");
            document.querySelectorAll(".navbar-nav .nav-link.active, .navbar-nav .nav-link.show").forEach(element => {
                element.classList.add("dark-theme__color-blue");
            });
            document.querySelector(".navbar-brand").classList.add("dark-theme__color-beige");
            document.querySelectorAll(".btn-outline-success").forEach(element => {
                element.classList.add("dark-theme__color-blue");
            });

            if (style) {
                style.innerText += innerText;
            } else {
                style = document.createElement("style");
                style.innerText = innerText;
                document.head.appendChild(style);
            }
        } else {
            console.log("Возврат к светлой теме...");
            document.body.classList.remove("dark-theme__color-beige");
            document.body.classList.remove("dark-theme__dark-background-body");
            document.querySelector(".form-control").classList.remove("dark-theme__dark-background-body");
            document.querySelector(".navbar").classList.remove("dark-theme__dark-background-navbar");
            document.querySelector("footer").classList.remove("dark-theme__dark-background-footer");
            document.querySelectorAll(".navbar-nav .nav-link.active, .navbar-nav .nav-link.show").forEach(element => {
                element.classList.remove("dark-theme__color-blue");
            });
            document.querySelector(".navbar-brand").classList.remove("dark-theme__color-beige");
            document.querySelectorAll(".btn-outline-success").forEach(element => {
                element.classList.remove("dark-theme__color-blue");
            });

            if (style) {
                const firstIndexDarkThemeStyle = style.innerText.indexOf(innerText);
                sliceStyle(firstIndexDarkThemeStyle, innerText.length);
            }
        }
    });
}

function fontToggle() {
    const fontCheckbox = document.querySelector(".font-check");

    if (document.querySelector(".navbar-brand").classList.contains("navbar-brand__big-font")) {
        fontCheckbox.setAttribute("checked", true);
    }

    fontCheckbox.addEventListener('change', function () {
        const fontToggleStyle =
            `body, .btn { font-size: 1.2rem !important; } h1 { font-size: 3rem; } h5, legend { font-size: 1.75rem; } input::placeholder { font-size: 1.1rem; }`;

        if (this.checked) {
            document.querySelector(".navbar-brand").classList.add("navbar-brand__big-font");

            if (style) {
                style.innerText += fontToggleStyle;
            } else {
                style = document.createElement("style");
                style.innerText = fontToggleStyle;
                document.head.appendChild(style);
            }
        } else {
            document.querySelector(".navbar-brand").classList.remove("navbar-brand__big-font");

            if (style) {
                const firstIndexFontToggleStyle = style.innerText.indexOf(fontToggleStyle);
                sliceStyle(firstIndexFontToggleStyle, fontToggleStyle.length);
            }
        }
    });
}

function sliceStyle(firstIndex, length) {
    if (firstIndex !== -1) {
        const lastIndex = firstIndex + length;
        const innerText = style.innerText.slice(0, firstIndex) + style.innerText.slice(lastIndex);
        style.innerText = innerText;
    }
}