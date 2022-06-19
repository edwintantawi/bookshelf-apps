class Observer {
  constructor() {
    this._events = new Set();
  }

  attach(event) {
    this._events.add(event);
  }

  notify() {
    this._events.forEach((event) => event());
  }
}
