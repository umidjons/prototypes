'use strict';

const input = document.querySelector('input');
const select = document.querySelector('select');
const output = document.querySelector('output');

const id$ = Rx.Observable.fromEvent(input, 'input').map(e => e.target.value).distinctUntilChanged().debounceTime(200);
const select$ = Rx.Observable.fromEvent(select, 'change').map(e => e.target.value);

Rx.Observable
  .combineLatest(id$, select$)
  .switchMap(getResources)
  .map(resp => resp.response)
  .subscribe(render, handleError);

function getResources([id, resource]) {
  return Rx.Observable.ajax(`https://jsonplaceholder.typicode.com/${resource}?userId=${id}`);
}

function handleError(err) {
  console.error(err);
}

function render(items) {
  output.innerHTML = '';
  for(let item of items){
    const h1 = document.createElement('h1');
    h1.innerHTML = item.title;
    output.appendChild(h1);

    const p = document.createElement('p');
    p.innerHTML = `id: ${item.id} userId: ${item.userId}`;
    output.appendChild(p);
  }
}
