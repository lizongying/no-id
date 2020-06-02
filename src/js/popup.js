// import '../css/popup.css';

const bg = chrome.extension.getBackgroundPage().bg;

const setUserId = (value) => {
    const labelUserId = document.querySelector('#user-id');
    labelUserId.value = value;
};

const setResult = (value) => {
    value.forEach(
        (v) => {
            let node = document.createElement('li');
            node.innerHTML = '<img src="' + v[0] + '"><span>' + v[1] +
                '</span><span>' + v[2] + '</span>';
            node.onclick = () => {
                setUserId(v[2]);
            };
            ulResult.appendChild(node);
        },
    );
};

// ui
window.$ui = {
    setUserId: setUserId,
    setResult: setResult,
};

const input = document.querySelectorAll('input');
const ulResult = document.querySelector('#result');
input.forEach((v) => {
    v.onchange = (() => {
        ulResult.innerHTML = '';
        const inputType = document.querySelector('input[name="type"]:checked');
        const inputQuery = document.querySelector('#query');
        bg.getUserId(inputType.value, inputQuery.value);
    });
});
