import React from 'react';

class Singleton {
  static use (initial_state = {}) {
    if (!this.instance) {
      this.instance = new this(initial_state);
    }
    const {instance} = this;
    const setState = React.useState()[1];
    React.useEffect(()=> {
      instance.addListener(setState);
      return ()=> {
        instance.removeListener(setState);
      };
    }, []);
    return instance;
  }

  constructor (state = {}) {
    this.state = this.initialize(state);
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

export default function useSingleton (Class, initial_state = {}) {
  return Class.use(initial_state);
}
useSingleton.Singleton = Singleton;
