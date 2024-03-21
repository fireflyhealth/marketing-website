import { Reducer, useCallback, useEffect, useReducer } from 'react';
import { Status } from '../constants';

type State<T> =
  | {
      status: Status.Idle;
    }
  | {
      status: Status.Pending;
    }
  | {
      status: Status.Fulfilled;
      result: T;
    }
  | {
      status: Status.Rejected;
      errorMessage: string;
    };

type RequestStartAction = {
  type: 'requestStart';
};
type RequestFulfilledAction<T> = {
  type: 'requestFulfilled';
  result: T;
};
type RequestRejectedAction = {
  type: 'requestRejected';
  errorMessage: string;
};
type ResetAction = {
  type: 'reset';
};

type Action<T> =
  | RequestStartAction
  | RequestFulfilledAction<T>
  | RequestRejectedAction
  | ResetAction;

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'requestStart':
      return {
        ...state,
        status: Status.Pending,
      };
    case 'requestFulfilled':
      return {
        status: Status.Fulfilled,
        result: action.result,
      };
    case 'requestRejected':
      return {
        status: Status.Rejected,
        errorMessage: action.errorMessage,
      };
    case 'reset': {
      return {
        status: Status.Idle,
      };
    }
  }
};

type MakeRequest = () => Promise<void>;

type ReturnValue<T> = [State<T>, MakeRequest];

type Options = {
  /* If true, the callback will fire upon the initial
   * render. */
  triggerImmediately?: boolean;
};

/**
 * A hook which, given an async function, returns the status, resolved value
 * of the function, and a callback to trigger that function.
 *
 * Optionally fires the function upon mount.
 */
export const useRequest = <T>(
  callback: () => Promise<T>,
  options: Options = {},
): ReturnValue<T> => {
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(reducer, {
    status: Status.Idle,
  });

  const makeRequest = useCallback(async () => {
    dispatch({ type: 'requestStart' });
    try {
      const result = await callback();
      dispatch({ type: 'requestFulfilled', result });
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unknown error occurred';
      dispatch({ type: 'requestRejected', errorMessage });
    }
  }, [callback]);

  useEffect(() => {
    if (state.status === Status.Idle && options.triggerImmediately) {
      makeRequest();
    }
  }, [state.status, options.triggerImmediately, makeRequest]);

  return [state, makeRequest];
};
