'use strict';

const button = document.querySelector('button');
const output = document.querySelector('output');

Rx.Observable
  .fromEvent(button, 'click')
  .flatMap(getAlbums)
  .map(response => response.response)
  .subscribe(render, handleError);

function getAlbums() {
  const userId = Math.round(Math.random() * 10);
  return Rx.Observable.ajax(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
}

function handleError(err) {
  console.error(err);
}

function render(albums) {
  output.innerHTML = '';
  for(let album of albums){
    const h1 = document.createElement('h1');
    h1.innerHTML = album.title;
    output.appendChild(h1);

    const p = document.createElement('p');
    p.innerHTML = `id: ${album.id} userId: ${album.userId}`;
    output.appendChild(p);
  }
}
