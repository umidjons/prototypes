'use strict';

const button = document.querySelector('button');
const output = document.querySelector('output');

const click$ = Rx.Observable.fromEvent(button, 'click');

click$
  .bufferWhen(() => click$.delay(400)) // during 400ms
  .filter(events => events.length >= 3) // 3 or more events
  .subscribe(() => {
    output.textContent = Math.random().toString(36).slice(2);
  });
