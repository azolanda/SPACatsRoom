"use strict";

// POST
const inputSearch = document.querySelector(".form-search");
const searchButton = document.querySelector(".btn-search");
let inputSearchValue = '';

const startSearch = async (event) => {
    new Promise((res, rej) => {
        const elementForPushSearchResults = document.querySelector("#main-box");

        if (document.querySelector(".product-cards") != null) {
            elementForPushSearchResults.querySelector("h1").innerHTML = "Результаты поиска";

        } else {
            elementForPushSearchResults.innerHTML = '<h1 class="mt-5 mb-4">Результаты поиска</h1><div class = "cards product-cards row justify-content-center"></div>';
        }
        res(event);
    }).then((e) => postSearch(event)).then(() => getSearchData(document.querySelector(".product-cards")))
}

searchButton.addEventListener('click', startSearch);
searchButton.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        startSearch(e);
    }
});

async function postSearch(e) {
    e.preventDefault();
    inputSearchValue = inputSearch.value;

    if (inputSearchValue == '') {
        return;
    }

    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            searchValue: inputSearchValue
        })
    });
}

async function getSearchData(dataArticlesField) {
    let searchData = null;

    await fetch(baseUrl + `search/natalie?key=${inputSearchValue}`, {
        method: 'GET'
    }).then(result => {
        return result.json()
    }).then((resultData) => {
        searchData = resultData;
    });

    dataArticlesField.innerHTML = "";

    setTimeout(() => {
        inputSearch.value = "";
    }, 200);

    renderData(searchData, dataArticlesField);
}