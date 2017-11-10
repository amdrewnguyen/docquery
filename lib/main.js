const DOMNodeCollection = require('./dom_node_collection.js');

const callbackQueue = [];

const _$ = function(arg) {
  if (typeof arg === 'string') {
    if (arg.startsWith("<") && arg.endsWith(">")) {
      return _$(document.createElement(arg.slice(1, arg.length - 1)));
    } else {
      const els = Array.from(document.querySelectorAll(arg));
      return new DOMNodeCollection(els);
    }
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (arg instanceof Function) {
    callbackQueue.push(arg);
  }
};

document.addEventListener("DOMContentLoaded", function() {
  callbackQueue.forEach(
    (callback) => {
      callback();
    }
  );
});

window._$ = _$;

_$.extend = function(arg1,...args) {
  return Object.assign(arg1, ...args);
};

_$.ajax = function(options) {
  const defaults = {
    url: window.location.href,
    method: "GET",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: () => {},
    error: () => {}
  };

  const params = _$.extend(defaults, options);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(params.method, params.url);
    xhr.setRequestHeader('Content-Type', params.contentType);

    xhr.onload = function(data) {
      params.success(JSON.parse(data.currentTarget.response));
      resolve(JSON.parse(data.currentTarget.response));
    };
    xhr.onerror = () => {
      params.error();
      reject();
    };
    xhr.send(params.data);
  });
};
