class Reactive {
  constructor(state, observer) {
    this.data = new Proxy(state, this._proxyHandler(observer));
  }

  _proxyHandler(observer) {
    return {
      get(target, key) {
        return target[key];
      },
      set(target, key, value) {
        target[key] = value;
        observer.notify();
        return true;
      },
    };
  }
}
