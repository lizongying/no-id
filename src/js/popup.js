import '../css/popup.css'

const bg = chrome.extension.getBackgroundPage().bg;

const setKuaishou = (value) => {
    const label_kuaishou = document.querySelector('#kuaishou—label');
    label_kuaishou.value = value;
};

// ui
window.$ui = {
    setKuaishou: setKuaishou,
};

const input_kuaishou = document.querySelector('#kuaishou');
input_kuaishou.onchange = (() => {
    // setKuaishou(input_kuaishou.value);
    // chrome.cookies.remove({
    //         'url': 'https://live.kuaishou.com/',
    //         'name': 'did',
    //     }
    // );
    // chrome.cookies.set({
    //         'url': 'https://live.kuaishou.com/',
    //         'name': 'did',
    //         'value': 'web_818d6b04375e4889845c9595ee1a5c04'
    //     }
    // );
    bg.getKuaishou(input_kuaishou.value);
});