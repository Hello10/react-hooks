import React, { useRef, useReducer } from 'react';

const {
  requestAnimationFrame,
  cancelAnimationFrame
} = window;
function useAnimationFrame(callback) {
  const request = useRef();
  const last_time = useRef();
  const first_time = useRef();

  function animate(time) {
    let first = first_time.current;

    if (first === undefined) {
      first_time.current = time;
      first = time;
    }

    const last = last_time.current;

    if (last !== undefined) {
      const delta = time - last;
      const total = time - first;
      callback({
        delta,
        total
      });
    }

    last_time.current = time;
    request.current = requestAnimationFrame(animate);
  }

  React.useEffect(() => {
    request.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(request.current);
  }, []);
}

class Singleton {
  static use(initial) {
    console.log('use!');

    if (!this.instance) {
      this.instance = new this(initial || {});
    }

    const {
      instance
    } = this;
    const [, setState] = React.useState();
    React.useEffect(() => {
      instance.addListener(setState);
      return () => {
        instance.removeListener(setState);
      };
    }, []);
    return instance;
  }

  constructor(initial) {
    if (this.constructor.instance) {
      throw new Error("Don't call singleton constructor directly");
    }

    if (initial.constructor === Function) {
      initial = initial();
    }

    this.state = this.initialize(initial);
    this.listeners = [];
  }

  initialize(state) {
    return state;
  }

  setState(state) {
    this.state = { ...this.state,
      ...state
    };

    for (const setState of this.listeners) {
      setState(this.state);
    }
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

}

function useSingleton(Class, initial) {
  return Class.use(initial);
}
useSingleton.Singleton = Singleton;

function useStateBlob(initial) {
  return useReducer((state, delta) => {
    return { ...state,
      ...delta
    };
  }, initial);
}

export { useAnimationFrame, useSingleton, useStateBlob };
//# sourceMappingURL=index.modern.js.map
