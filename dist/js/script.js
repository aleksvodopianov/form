'use strict';
// Next function checks browser support WEBP format ********************************************************************************************************
function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
        console.log('use webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
        console.log('not use webp');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const dbFilms = {
        list: [],
    };
    const addForm = document.querySelector('.add'),
        addInput = addForm.querySelector('.adding__input'),
        filmsListContainer = document.querySelector('.filmsListContainer'),
        filmsList = filmsListContainer.querySelector('.filmsList'),
        filmsUlList = filmsList.querySelector('.filmsUlList');

    // filmsListContainer.innerHTML = '';

    const createFilmsList = () => {
        // filmsListContainer.innerHTML = `
        //     <div class="filmsList">
        //         <p>Просмотренные фильмы:</p>
        //         <ul class="filmsUlList"></ul>
        //     </div>`;

        dbFilms.list.forEach((item, index) => {
            filmsUlList.innerHTML = `
            <li class="promo__interactive-item">
               ${index + 1}. ${item}
            </li>`;
        });
    };

    addForm.addEventListener('submit', evt => {
        evt.preventDefault();
        const newFilm = addInput.value;
        if (newFilm) {
            dbFilms.list.push(newFilm);
            dbFilms.list.sort();
            filmsUlList.innerHTML = '';
            createFilmsList();
            console.log(dbFilms.list);
        }
        addInput.value = '';
    });
});

// Не правильно добавляются фильмы в список на странице
