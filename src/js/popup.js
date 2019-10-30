import '../css/popup.css'

const bg = chrome.extension.getBackgroundPage().bg;

const setKuaishou = (value) => {
    const label_kuaishou = document.querySelector('#kuaishou—label');
    label_kuaishou.value = value;
};

const setXiaohongshu = (value) => {
    const label_xiaohongshu = document.querySelector('#xiaohongshu-label');
    label_xiaohongshu.value = value;
};

// ui
window.$ui = {
    setKuaishou: setKuaishou,
    setXiaohongshu: setXiaohongshu,
};

const input_kuaishou = document.querySelector('#kuaishou');
input_kuaishou.onchange = (() => {
    bg.getKuaishou(input_kuaishou.value);
});

const input_xiaohongshu = document.querySelector('#xiaohongshu');
input_xiaohongshu.onchange = (() => {
    bg.getXiaohongshu(input_xiaohongshu.value);
});