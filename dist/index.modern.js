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
  static use(options = {}) {
    if (!this.instance) {
      this.instance = new this(options);
    }

    const {
      instance
    } = this;
    const [, setState] = React.useState();
    React.useEffect(() => {
      let is_mounted = true;

      function setStateIfMounted(state) {
        if (is_mounted) {
          setState(state);
        }
      }

      instance.addListener(setStateIfMounted);
      return () => {
        is_mounted = false;
        instance.removeListener(setStateIfMounted);
      };
    }, []);
    return instance;
  }

  constructor(options = {}) {
    if (this.constructor.instance) {
      throw new Error("Don't call singleton constructor directly");
    }

    this.options = options;
    this.listeners = [];
    let {
      state = {}
    } = options;

    if (state.constructor === Function) {
      state = state();
    }

    this.state = this.initialize(state);
  }

  initialize(state) {
    return state;
  }

  setState(state) {
    this.state = { ...this.state,
      ...state
    };

    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

}

function useSingleton(Class, options = {}) {
  return Class.use(options);
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
