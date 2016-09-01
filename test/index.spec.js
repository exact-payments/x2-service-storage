/* global window describe it assert beforeEach */
import Storage from '../src';

describe('X2 Service -> Storage', () => {

  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('should create a new instance of Storage', () => {
    const store = new Storage();

    assert.equal(typeof store, 'object');
    assert.ok(store instanceof Storage);
  });

  describe('get', () => {
    it('should return a string value from localStorage', () => {
      window.localStorage.foo = 'bar';
      const store = new Storage();

      assert.equal(store.get('foo'), 'bar');
    });

    it('should return an object value from localStorage', () => {
      window.localStorage.foo = { value: 'bar' };
      const store = new Storage();

      assert.equal(store.get('foo'), { value: 'bar' });
    });
  });

  describe('getAll', () => {
    it('should return all keys from localStorage', () => {
      window.localStorage.foo = 'bar';
      window.localStorage.baz = 'pony';

      const store = new Storage();

      assert.notEqual(store.getAll().indexOf('foo'), -1);
      assert.notEqual(store.getAll().indexOf('baz'), -1);
    });
  });

  describe('set', () => {
    it('should set a key and a string value to localStorage', () => {
      const store = new Storage();
      store.set('foo', 'bar');

      assert.equal(window.localStorage.foo, 'bar');
    });

    it('should set a key and an object value to localStorage', () => {
      const store = new Storage();
      store.set('foo', { value: 'bar' });

      assert.deepEqual(JSON.parse(window.localStorage.foo), { value: 'bar' });
    });
  });

  describe('remove', () => {
    it('should remove an item from localStorage', () => {
      window.localStorage.foo = 'bar';

      const store = new Storage();
      store.remove('foo');

      assert.equal(window.localStorage.foo, undefined);
    });
  });

  describe('clear', () => {
    it('should remove all items from localStorage', () => {
      window.localStorage.foo = 'bar';
      window.localStorage.baz = 'pony';

      const store = new Storage();
      store.clear();

      assert.equal(window.localStorage.foo, undefined);
      assert.equal(window.localStorage.baz, undefined);
    });
  });
});
