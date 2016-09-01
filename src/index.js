/* global window */

class Storage {

  constructor(strategy) {
    this.storage = strategy && strategy.toLowerCase() === 'session' ?
      window.sessionStorage : window.localStorage;
  }

  get(key) {
    const value = this.storage.getItem(key);

    if (typeof value !== 'string') { return value; }

    try {
      return JSON.parse(value);
    } catch (ex) {
      return value || undefined;
    }
  }

  getAll() {
    return Array.apply(0, new Array(this.storage.length))
      .map((x, index) => this.storage.key(index));
  }

  set(key, value) {
    if (!key) { return; }

    value = typeof value === 'object' ? JSON.stringify(value) : value;
    this.storage.setItem(key, value);

    return value;
  }

  remove(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

export default Storage;
