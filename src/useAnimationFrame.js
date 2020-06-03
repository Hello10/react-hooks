import React, {useRef} from 'react';

const {requestAnimationFrame, cancelAnimationFrame} = window;

export default function useAnimationFrame (callback) {
  const request = useRef();
  const last_time = useRef();
  const first_time = useRef();

  function animate (time) {
    let first = first_time.current;
    if (first === undefined) {
      first_time.current = time;
      first = time;
    }

    const last = last_time.current;
    if (last !== undefined) {
      const delta = time - last;
      const total = time - first;
      callback({delta, total});
    }

    last_time.current = time;
    request.current = requestAnimationFrame(animate);
  }

  React.useEffect(()=> {
    request.current = requestAnimationFrame(animate);
    return ()=> cancelAnimationFrame(request.current);
  }, []);
}
