// notify
const notify = (data) => {
  const popup = chrome.extension.getViews({type: 'popup'})[0];
  popup.$ui[data[0]](...data.slice(1));
};

// Kuaishou
const getKuaishou = (value) => {
  if (!value.match(/kuaishou/)) {
    notify(['setUserId', '']);
    return;
  }
  let url ='https://live.kuaishou.com/graphql';
  let data = {"operationName": "sensitiveUserInfoQuery",
    "variables": {"principalId": value.split('?', 1)[0].split('/')[4]},
    "query": "query sensitiveUserInfoQuery($principalId: String) {sensitiveUserInfo(principalId: $principalId) {userId}}"};
  console.log(data);
  fetch(url, {
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST',
  }).then(function(response) {
    return response.text();
  }).then(function(text) {
    console.log(text);
    const re = /"userId":"(\d+?)"/;
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
const getXiaohongshu = (value) => {
  const re = /www\.xiaohongshu\.com\/user\/profile\/(.+?)\?/;
  const result = value.match(re);
  if (result) {
    console.log(result[1]);
    notify(['setUserId', result[1]]);
  } else {
    notify(['setUserId', '']);
  }
};

// Douyin
const getDouyin = (value) => {
  if (!value.match(/douyin/)) {
    notify(['setUserId', '']);
    return;
  }
  fetch(value.split('?', 1)[0], {
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
const getWanmeicaizhuang = (value) => {
  const re = /www\.beautycircle\.com\/profile\/(\d+)/;
  const result = value.match(re);
  if (result) {
    console.log(result[1]);
    notify(['setUserId', result[1]]);
  } else {
    notify(['setUserId', '']);
  }
};

const getUserId = (type, value) => {
  console.log(type, value);
  switch (type) {
    case 'kuaishou':
      getKuaishou(value);
      break;
    case 'xiaohongshu':
      getXiaohongshu(value);
      break;
    case 'douyin':
      getDouyin(value);
      break;
    case 'wanmeicaizhuang':
      getWanmeicaizhuang(value);
      break;
    default:
      break;
  }
};

window.bg = {
  getUserId: getUserId,
};
