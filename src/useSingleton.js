import React from 'react';

class Singleton {
  static use (options = {}) {
    if (!this.instance) {
      this.instance = new this(options);
    }
    const {instance} = this;
    const [, setState] = React.useState();
    React.useEffect(()=> {
      instance.addListener(setState);
      return ()=> {
        instance.removeListener(setState);
      };
    }, []);
    return instance;
  }

  constructor (options = {}) {
    if (this.constructor.instance) {
      throw new Error("Don't call singleton constructor directly");
    }

    this.options = options;
    this.listeners = [];

    let {state = {}} = options;
    if (state.constructor === Function) {
      state = state();
    }
    this.state = this.initialize(state);
  }

  initialize (state) {
    return state;
  }

  setState (state) {
    this.state = {
      ...this.state,
      ...state
    };

    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  addListener (listener) {
    this.listeners.push(listener);
  }

  removeListener (listener) {
    this.listeners = this.listeners.filter((l)=> l !== listener);
  }
}

export default function useSingleton (Class, options = {}) {
  return Class.use(options);
}
useSingleton.Singleton = Singleton;
