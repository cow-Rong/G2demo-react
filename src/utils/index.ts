import { useMemo, useRef, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

import { useEffect } from 'react';

// If you're only working with primitives, this is not required
import isEqual from "lodash/isEqual";
import moment from "moment";

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";


// let a: object
// a = {name: 'jack'}
// a = () => {
// }
// a = new RegExp('')
//
// let b: { [key: string]: unknown }
// b = {name: 'Jack'}
// b = () => {}
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object?: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  if (!object) {
    return {};
  }
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};


/**
* 返回页面url中，指定键的参数值
*/
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useUndoableState(init: any) {
  const [states, setStates] = useState([init]); // Used to store history of all states
  const [index, setIndex] = useState(0); // Index of current state within `states`
  const state = useMemo(() => states[index], [states, index]); // Current state
  const setState = (value: any) => {
    // Use lodash isEqual to check for deep equality
    // If state has not changed, return to avoid triggering a re-render
    if (isEqual(state, value)) {
      return;
    }
    const copy = states.slice(0, index + 1); // This removes all future (redo) states after current index
    copy.push(value);
    setStates(copy);
    setIndex(copy.length - 1);
  };
  // Clear all state history
  const resetState = (init: any) => {
    setIndex(0);
    setStates([init]);
  };
  // Allows you to go back (undo) N steps
  const goBack = (steps = 1) => {
    setIndex(Math.max(0, Number(index) - (Number(steps) || 1)));
  };
  // Allows you to go forward (redo) N steps
  const goForward = (steps = 1) => {
    setIndex(Math.min(states.length - 1, Number(index) + (Number(steps) || 1)));
  };
  return {
    state,
    setState,
    resetState,
    index,
    lastIndex: states.length - 1,
    goBack,
    goForward,
  };
}

// 判断是否全屏
export const IsFull = () => {
  const explorer = window.navigator.userAgent.toLowerCase();
  if (explorer.indexOf('chrome') > 0) { // webkit
    if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
      return true;
    } else {
      return false;
    }
  } else {// IE 9+  fireFox
    if (window.outerHeight === window.screen.height && window.outerWidth === window.screen.width) {
      return true;
    } else {
      return false;
    }
  }
};


export const TimestampToString = (time: number, format: string = "YYYY-MM-DD HH:mm:ss") => {
  return moment(time).format(format) || time;
}

export const isNameValidor = (value:string)=>{
  return value.trim()===''|| new RegExp(/^["%|=;<>:'\\]{1,}$/, "g").test(value);
}
