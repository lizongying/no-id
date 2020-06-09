// notify
const notify = (data) => {
    const popup = chrome.extension.getViews({type: 'popup'})[0];
    popup.$ui[data[0]](...data.slice(1));
};

// // Kuaishou
// const getKuaishou = (query) => {
//     if (!query.match(/kuaishou/)) {
//         notify(['setUserId', '']);
//         return;
//     }
//     let url = 'https://live.kuaishou.com/graphql';
//     let data = {
//         'operationName': 'sensitiveUserInfoQuery',
//         'variables': {'principalId': query.split('?', 1)[0].split('/')[4]},
//         'query': 'query sensitiveUserInfoQuery($principalId: String) {sensitiveUserInfo(principalId: $principalId) {userId}}',
//     };
//     console.log(data);
//     fetch(url, {
//         headers: {
//             'content-type': 'application/json',
//         },
//         body: JSON.stringify(data),
//         method: 'POST',
//     }).then(function(response) {
//         return response.text();
//     }).then(function(text) {
//         console.log(text);
//         const re = /"userId":"(\d+?)"/;
//         const result = text.match(re);
//         if (result) {
//             console.log(result[1]);
//             notify(['setUserId', result[1]]);
//         } else {
//             notify(['setUserId', '']);
//         }
//     });
// };

// Kuaishou
const getKuaishou = (query) => {
    if (!query.match(/kuaishou/)) {
        notify(['setUserId', '']);
        return;
    }
    let url = query.trim();
    fetch(url, {
    }).then(function(response) {
        console.log(response.headers);
        return response.url;
    }).then(function(text) {
        console.log(text);
        const re = /shareObjectId=(\d+)/;
        const result = text.match(re);
        if (result) {
            console.log(result[1]);
            notify(['setUserId', result[1]]);
        } else {
            notify(['setUserId', '']);
        }
    });
};

// Xiaohongshu
const getXiaohongshu = (query) => {
    const re = /www\.xiaohongshu\.com\/user\/profile\/(.+?)\?/;
    const result = query.match(re);
    if (result) {
        console.log(result[1]);
        notify(['setUserId', result[1]]);
    } else {
        notify(['setUserId', '']);
    }
};

// Douyin
const getDouyin = (query) => {
    if (!query.match(/douyin/)) {
        notify(['setUserId', '']);
        return;
    }
    fetch(query.split('?', 1)[0], {
        headers: {
            'content-type': 'text/html;',
        },
    }).then(function(response) {
        return response.url;
    }).then(function(text) {
        const re = /user\/(\d+?)\?/;
        const result = text.match(re);
        if (result) {
            console.log(result[1]);
            notify(['setUserId', result[1]]);
        } else {
            notify(['setUserId', '']);
        }
    });
};

// Wanmeicaizhuang
const getWanmeicaizhuang = (query) => {
    const re = /www\.beautycircle\.com\/profile\/(\d+)/;
    const result = query.match(re);
    if (result) {
        console.log(result[1]);
        notify(['setUserId', result[1]]);
    } else {
        notify(['setUserId', '']);
    }
};

// Guimimeizhuang
const getGuimimeizhuang = (query) => {
    let formData = new FormData();
    formData.append('platform', 2);
    formData.append('rd', 512);
    formData.append('page', 1);
    // formData.append('channel', '小米开发平台');
    formData.append('keyword', query.trim());
    fetch('http://misc.kimiss.com/common/mapi/v151/', {
        method: 'post',
        body: formData,
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
        const result = json.de.thy.map((v) => {
            return [v.ar, v.ue, v.ud];
        });
        if (result) {
            console.log(result);
            notify(['setResult', result]);
        } else {
            notify(['setResult', []]);
        }
    });
};

// Weimeimeizhuang
const getWeimeimeizhuang = (query) => {
    fetch(
        'https://app.vmei.com/beauty/search/user?pageSize=20&pageNo=1&keyword=' +
        query.trim(), {}).then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
        const result = json.data.post.products.map((v) => {
            return [
                'http://img06.vmei.com' + v.headIconUrl,
                v.nickName,
                v.userId];
        });
        if (result) {
            console.log(result);
            notify(['setResult', result]);
        } else {
            notify(['setResult', []]);
        }
    });
};

const getUserId = (type, query) => {
    console.log(type, query);
    switch (type) {
        case 'kuaishou':
            getKuaishou(query);
            break;
        case 'xiaohongshu':
            getXiaohongshu(query);
            break;
        case 'douyin':
            getDouyin(query);
            break;
        case 'wanmeicaizhuang':
            getWanmeicaizhuang(query);
            break;
        case 'guimimeizhuang':
            getGuimimeizhuang(query);
            break;
        case 'weimeimeizhuang':
            getWeimeimeizhuang(query);
            break;
        default:
            break;
    }
};

window.bg = {
    getUserId: getUserId,
};
