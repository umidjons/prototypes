'use strict';

const button = document.querySelector('button');
const output = document.querySelector('output');

button.addEventListener('click', e => {
  output.textContent = Math.random().toString(36).slice(2);
});
