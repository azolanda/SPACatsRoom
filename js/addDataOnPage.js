"use strict";

let data;
const baseUrl = "../";

async function getData(dataArticlesField) {
    const res = await fetch(baseUrl + 'info/natalie?key=hello', {
        method: 'GET'
    })

    data = await res.json();
    renderData(data, dataArticlesField);
}

function renderData(dataForRender, elementForDataRender) {
    if (data === undefined) {
        data = dataForRender;
    }

    if (dataForRender.info === undefined || dataForRender.info.length == 0) {
        elementForDataRender.innerHTML = "<p>К сожалению, информация не найдена...</p>";
    } else {
        for (let i = 0; i < dataForRender.info.length; i++) {
            const src = "./img/" + dataForRender.info[i].picture;

            let stringInnerHTML = `<div class="card product-card col-xl-3 col-md-4 col-sm-6 dark__theme" data-id = ${dataForRender.info[i].id}>
            <img src=${src} class="card-img-top" alt="article-picture">
            <div class="card-body card-article">
                <h5 class="card-title">${dataForRender.info[i].name}</h5>
                <p class="card-text">`;

            let aboutTextLength = 100;
            if (aboutTextLength > dataForRender.info[i].about.length) {
                aboutTextLength = dataForRender.info[i].about.length;
            }

            stringInnerHTML += textWithParagraphs(dataForRender.info[i], aboutTextLength);

            stringInnerHTML += `...</p>
                            <button data-btn_id = ${dataForRender.info[i].id} class="btn btn-primary btn-articles btn-dark" onclick = "readArticle(this)">Читать далее</button>
                        </div>
                    </div>`;
            elementForDataRender.innerHTML += stringInnerHTML;
        }
    }

}

function readArticle(onclickButton) {
    document.body.style.overflow = "hidden";

    let dataArticle;
    const dataId = onclickButton.dataset.btn_id;

    data.info.forEach(element => {
        if (element.id == dataId) {
            dataArticle = element;
        }
    });

    const dataArticlesFieldForPush = onclickButton.closest(".product-cards");
    const footer = document.querySelector("footer");
    const src = "./img/" + dataArticle.picture;

    const scrollBarWidth = getScrollBarWidth();

    let stringInnerHTML = `<div class = "about__popup dark__theme">
    <div class = "container about__popup-container pb-3">
        <div class = "article__header mb-4 mt-5">
            <h1>${dataArticle.name}</h1>
            <svg class="close__icon" onclick = "closeArticle()" width="1.2em" height="1.2em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path fill="#9692a9" fill-rule="evenodd" d="M11.2929,3.29289 C11.6834,2.90237 12.3166,2.90237 12.7071,3.29289 C13.0976,3.68342 13.0976,4.31658 12.7071,4.70711 L9.41421,8 L12.7071,11.2929 C13.0976,11.6834 13.0976,12.3166 12.7071,12.7071 C12.3166,13.0976 11.6834,13.0976 11.2929,12.7071 L8,9.41421 L4.70711,12.7071 C4.31658,13.0976 3.68342,13.0976 3.29289,12.7071 C2.90237,12.3166 2.90237,11.6834 3.29289,11.2929 L6.58579,8 L3.29289,4.70711 C2.90237,4.31658 2.90237,3.68342 3.29289,3.29289 C3.68342,2.90237 4.31658,2.90237 4.70711,3.29289 L8,6.58579 L11.2929,3.29289 Z"></path>
            </svg>
        </div>
        <div class="article__img article__img-big mb-4">
            <img src=${src} class="card-img-top" alt="article-picture">
        </div>
        <div class="card-body pb-4">
            <p class="card-text text-article">`;

    stringInnerHTML += textWithParagraphs(dataArticle, dataArticle.about.length);
    stringInnerHTML += `</p>
            </div>
            <div class = "article__source mb-5">
                <a href=${dataArticle.source} target="_blank">Источник</a>
            </div>
        </div>`
    stringInnerHTML += footer.outerHTML;
    stringInnerHTML += `</div>`;
    dataArticlesFieldForPush.innerHTML += stringInnerHTML;

    const aboutPopupContainer = document.querySelector(".about__popup-container");

    const popupPaddingLeft = parseFloat(window.getComputedStyle(aboutPopupContainer).paddingLeft) + Math.floor(scrollBarWidth / 2) + 'px';

    const popupPaddingRight = parseFloat(window.getComputedStyle(aboutPopupContainer).paddingRight) - Math.floor(scrollBarWidth / 2);

    aboutPopupContainer.style.paddingLeft = popupPaddingLeft;

    if (popupPaddingRight > 0) {
        aboutPopupContainer.style.paddingRight = popupPaddingRight + 'px';
    }
}

function getScrollBarWidth() {
    const el = document.createElement("div");
    el.style.cssText = "overflow:scroll; visibility:hidden; position:absolute;";
    document.body.appendChild(el);
    let width = el.offsetWidth - el.clientWidth;
    el.remove();
    return width;
}

function closeArticle() {
    const popup = document.querySelector(".about__popup");
    popup.remove();
    document.body.style.overflow = "visible";
}

function textWithParagraphs(data, length) {
    let strInnerHTML = "";
    for (let n = 0; n < length; n++) {
        if (data.about[n] === "_") {
            strInnerHTML += `</p><p class="card-text text-article">`;

        } else {
            strInnerHTML += `${data.about[n]}`;
        }

    }
    return strInnerHTML;
}