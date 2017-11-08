class DOMNodeCollection {
  constructor(arr) {
    this.elements = arr;
    this.listeners = {};
  }

  html(arg) {
    if (arg) {
      this.elements.forEach((el) => {
        el.innerHTML = arg;
      });
    } else {
      return this.elements[0].innerHTML;
    }
  }

  empty() {
    this.elements.forEach((el) => {
      el.outerHTML = '';
    });
  }

  append(arg) {
    const toAppend = [];
    if (arg instanceof DOMNodeCollection ) {
      // debugger
      arg.elements.forEach((el) => {
        toAppend.push(el.outerHTML);
      });
    } else if (arg instanceof HTMLElement) {
      toAppend.push(arg.outerHTML);
    } else{
      toAppend.push(arg);
    }

    this.elements.forEach((el) => {
      toAppend.forEach((child) => {
          el.innerHTML += child;
      });
    });
  }

  attr(atr, val) {
    if (val) {
      this.elements.forEach((el) => {
        el.setAttribute(atr, val);
      });
    } else {
      return this.elements[0].getAttribute(atr);
    }
  }

  addClass(arg) {
    const newClasses = arg.split(" ");
    this.elements.forEach((el) => {
      el.classList.add(...newClasses);
    });
  }

  text(arg) {
    if (arg) {
      this.elements.forEach((el) => {
        el.textContent = arg;
      });
    } else {
      return this.elements[0].textContent;
    }
  }

  removeClass(arg) {
    const newClasses = arg.split(" ");
    this.elements.forEach((el) => {
      el.classList.remove(...newClasses);
    });
  }

  toggleClass(arg) {
    const classes = arg.split(" ");
    this.elements.forEach((el) => {
      el.classList.toggle(...classes);
    });
  }

  children() {
    const childElements = [];
    this.elements.forEach((el) => {
      childElements.push(...el.children);
    });
    return new DOMNodeCollection(childElements);
  }

  parent() {
    const parentElements = [];
    this.elements.forEach((el) => {
      parentElements.push(el.parentElement);
    });
    return new DOMNodeCollection(parentElements);
  }

  find(arg) {
    const foundElements = [];
    this.elements.forEach((el) => {
      foundElements.push(...el.querySelectorAll(arg));
    });
    return new DOMNodeCollection(foundElements);
  }

  remove() {
    this.empty();
    this.elements = [];
  }

  val(value) {
    if (value === "" || value) {
      this.elements.forEach((el) => {
        el.value = value;
      });
    } else {
      return this.elements[0].value;
    }
  }

  on(listener, callback) {
    if (!this.listeners[listener]) this.listeners[listener] = [];
    this.listeners[listener].push(callback);
    this.elements.forEach((el) => {
      el.addEventListener(listener, callback);
    });
  }

  off(listener, callback) {
    if (callback) {
      this.elements.forEach((el) => {
        el.removeEventListener(listener, callback);
      });
      let cbIndex = this.listeners[listener].indexOf(callback);
      delete this.listeners[listener][cbIndex];
    } else {
      this.elements.forEach((el) => {
        this.listeners[listener].forEach((cb) => {
          el.removeEventListener(listener, cb);
        });
      });
      this.listeners[listener] = [];
    }
  }
}

module.exports = DOMNodeCollection;
