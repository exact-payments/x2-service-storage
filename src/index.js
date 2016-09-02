/* global window */

if (!window) { throw new Error('Missing window object.'); }
if (!window.localStorage) { throw new Error('localStorage is not supported.'); }
if (!window.sessionStorage) { throw new Error('sessionStorage is not supported.'); }

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
