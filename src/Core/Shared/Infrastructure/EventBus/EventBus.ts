class EventBus {
  private subscribers: {};
  private static instance?: EventBus = undefined;

  private constructor() {
    this.subscribers = {}
  }

  public static getInstance(): EventBus {
    if (this.instance === undefined) {
      this.instance = new EventBus();
    }

    return this.instance;
  }

  public subscribe(event: string, callback: Function) {
    if (!this.subscribers[event]) this.subscribers[event] = {};

    this.subscribers[event][this.subscribers[event].length] = callback;
  }

  public dispatch<T>(event: string, arg?: T): void {
    const subscribers = this.subscribers[event];

    if (subscribers === undefined) {
      return;
    }

    Object.values(subscribers).map(callable => callable(arg));
  }
}

export default EventBus;
