class LocalStorage {
  constructor() {
    if (typeof LocalStorage === 'undefined') {
      console.error(
        'LocalStorage is not support in your browser, try to update your browser or use another browser'
      );
    }
  }

  select(key) {
    const raw_data = localStorage.getItem(key);
    return JSON.parse(raw_data);
  }

  insert(key, value) {
    const raw_data = JSON.stringify(value);
    return localStorage.setItem(key, raw_data);
  }
}
