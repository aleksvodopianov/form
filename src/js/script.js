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

// document.querySelector('#wrapper').style.backgroundImage =
//     'url(../../img/photo_2021-11-29_23-07-36.jpg)';
// document.reload();

document.addEventListener('DOMContentLoaded', () => {
    const dbFilms = {
        list: [],
    };
    const addForm = document.querySelector('.add'),
        addInput = addForm.querySelector('.adding__input'),
        filmsListContainer = document.querySelector('.filmsListContainer'),
        filmsList = filmsListContainer.querySelector('.filmsList'),
        filmsUlList = filmsList.querySelector('.filmsUlList');

    addForm.addEventListener('submit', event => {
        event.preventDefault();
        let newFilm = addInput.value;
        if (newFilm) {
            if (newFilm.length > 14) {
                newFilm = `${newFilm.substring(0, 14)}...`;
            }

            dbFilms.list.push(newFilm);
            createFilmsList(dbFilms.list, filmsUlList);
            console.log(dbFilms.list);

            let checked = addForm.querySelector(`[type='checkbox']:checked`);
            if (checked) {
                console.log('Добавляем любимый фильм');
            }
        }
        event.target.reset();
    });

    const createFilmsList = (array, parent) => {
        dbFilms.list.sort();

        parent.innerHTML = '';

        array.forEach((item, index) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">
               ${index + 1}. ${item}
               <div class="trash"></div>
            </li>`;
        });

        document.querySelectorAll('.trash').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                dbFilms.list.splice(i, 1);
                createFilmsList(array, parent);
            });
        });
    };
});
