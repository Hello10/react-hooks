import {useReducer} from 'react';

export default function useStateBlob (initial) {
  return useReducer((state, delta)=> {
    return {
      ...state,
      ...delta
    };
  }, initial);
}
