import '../css/popup.css';

const bg = chrome.extension.getBackgroundPage().bg;

const setUserId = (value) => {
  const labelUserId = document.querySelector('#user-id');
  labelUserId.value = value;
};

// ui
window.$ui = {
  setUserId: setUserId,
};

const input = document.querySelectorAll('input');
input.forEach((v) => {
  v.onchange = (() => {
    const inputType = document.querySelector('input[name="type"]:checked');
    const inputUrl = document.querySelector('#url');
    bg.getUserId(inputType.value, inputUrl.value);
  });
});