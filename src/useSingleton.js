import React from 'react';

class Singleton {
  static use (initial) {
    if (!this.instance) {
      this.instance = new this(initial || {});
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

  constructor (initial) {
    if (this.constructor.instance) {
      throw new Error("Don't call singleton constructor directly");
    }
    if (initial.constructor === Function) {
      initial = initial();
    }
    this.state = this.initialize(initial);
    this.listeners = [];
  }

  initialize (state) {
    return state;
  }

  setState (state) {
    this.state = {
      ...this.state,
      ...state
    };

    for (const setState of this.listeners) {
      setState(this.state);
    }
  }

  addListener (listener) {
    this.listeners.push(listener);
  }

  removeListener (listener) {
    this.listeners = this.listeners.filter((l)=> l !== listener);
  }
}

export default function useSingleton (Class, initial) {
  return Class.use(initial);
}
useSingleton.Singleton = Singleton;
