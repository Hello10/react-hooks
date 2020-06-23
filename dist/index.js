function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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
  static use(options = {}) {
    if (!this.instance) {
      this.instance = new this(options);
    }

    const {
      instance
    } = this;
    const [, setState] = React__default.useState();
    React__default.useEffect(() => {
      instance.addListener(setState);
      return () => {
        instance.removeListener(setState);
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
    this.state = _extends({}, this.state, state);

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
  return React.useReducer((state, delta) => {
    return _extends({}, state, delta);
  }, initial);
}

exports.useAnimationFrame = useAnimationFrame;
exports.useSingleton = useSingleton;
exports.useStateBlob = useStateBlob;
//# sourceMappingURL=index.js.map
