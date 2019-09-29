// 通知
const notify = (data) => {
    const popup = chrome.extension.getViews({type: 'popup'})[0];
    console.log(popup.$ui[data[0]]);
    popup.$ui[data[0]](...data.slice(1));
};

// Kuaishou
const getKuaishou = (value) => {
    fetch(value.split('?', 1)[0], {
        headers: {
            'content-type': 'text/html;',
        }
    }).then(function (response) {
        return response.text()
    }).then(function (text) {
        const re = /"userId":"(\d+?)"/;
        const result = text.match(re);
        if (result) {
            console.log(result[1]);
            notify(['setKuaishou', result[1]]);
        }
    })
};

window.bg = {
    getKuaishou: getKuaishou,
};