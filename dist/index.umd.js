(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.reactHooks = {}, global.react));
}(this, (function (exports, React) {
  var React__default = 'default' in React ? React['default'] : React;

  const {
    requestAnimationFrame,
    cancelAnimationFrame
  } = window;
  function useAnimationFrame(callback) {
    const request = React.useRef();
    const last_time = React.useRef();
    const first_time = React.useRef();

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

    React__default.useEffect(() => {
      request.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(request.current);
    }, []);
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  class Singleton {
    static use(initial_state = {}) {
      if (!this.instance) {
        this.instance = new this(initial_state);
      }

      const {
        instance
      } = this;
      const setState = React__default.useState()[1];
      React__default.useEffect(() => {
        instance.addListener(setState);
        return () => {
          instance.removeListener(setState);
        };
      }, []);
      return instance;
    }

    constructor(state = {}) {
      this.state = this.initialize(state);
      this.listeners = [];
    }

    initialize(state) {
      return state;
    }

    setState(state) {
      this.state = _extends({}, this.state, state);

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

  function useSingleton(Class, initial_state = {}) {
    return Class.use(initial_state);
  }
  useSingleton.Singleton = Singleton;

  function useStateBlob(initial) {
    return React.useReducer((state, delta) => {
      return _extends({}, state, delta);
    }, initial);
  }

  exports.useAnimationFrame = useAnimationFrame;
  exports.useSingleton = useSingleton;
  exports.useStateBlob = useStateBlob;

})));
//# sourceMappingURL=index.umd.js.map
