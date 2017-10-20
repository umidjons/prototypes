'use strict';

const button = document.querySelector('button');
const output = document.querySelector('output');

Rx.Observable
  .fromEvent(button, 'click')
  .bufferCount(3)
  .subscribe(() => {
    output.textContent = Math.random().toString(36).slice(2);
  });
