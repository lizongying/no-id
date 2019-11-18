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
  fetch(value.split('?', 1)[0], {
    headers: {
      'content-type': 'text/html;',
    },
  }).then(function(response) {
    return response.text();
  }).then(function(text) {
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
    default:
      break;
  }
};

window.bg = {
  getUserId: getUserId,
};