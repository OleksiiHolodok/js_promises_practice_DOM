'use strict';

const showNotification = (message, type) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  const onClick = (ev) => {
    if (ev.button === 0) {
      resolved = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    if (!resolved) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', onClick);
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const onMouseDown = (ev) => {
    resolve('Second promise was resolved');
    document.removeEventListener('mousedown', onMouseDown);
  };

  document.addEventListener('mousedown', onMouseDown);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const checkClicks = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  const onMouseDown = (ev) => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    checkClicks();
  };

  document.addEventListener('mousedown', onMouseDown);
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((message) => showNotification(message, 'error'));

secondPromise.then((message) => showNotification(message, 'success'));

thirdPromise.then((message) => showNotification(message, 'success'));
