class LocalStorage {
  constructor({ key }) {
    this._key = key;
    this._hasStorage = typeof Storage !== 'undefined';

    if (!this._hasStorage) {
      alert(
        `LocalStorage is not support in your browser, try to update your browser or use another browser.\n
If you continue using, then all actions will not be saved!`
      );
    }
  }

  select() {
    if (this._hasStorage) {
      const raw_data = localStorage.getItem(this._key);
      return JSON.parse(raw_data) ?? [];
    }

    return [];
  }

  insert(value) {
    if (this._hasStorage) {
      const raw_data = JSON.stringify(value);
      return localStorage.setItem(this._key, raw_data);
    }
  }
}
