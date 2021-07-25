import { useEffect, useRef, useReducer, useCallback } from 'react';
import axios, { CancelTokenSource, AxiosRequestConfig } from 'axios';

interface ActionType {
  type?: string;
  payload?: Object;
  error?: Object;
}

interface UseAxiosConfigTypes extends AxiosRequestConfig {
  afterMount?: boolean;
}

interface InitialStateTypes {
  isLoading: boolean | undefined;
  response: Object | undefined;
  error: Object | undefined;
}

/**
 * useAxios custom hook actions
 *
 * @type {Object}
 */
export const AXIOS_HOOK_ACTIONS = {
  START: 'AXIOS_HOOK_ACTIONS_START',
  END: 'AXIOS_HOOK_ACTIONS_END',
};

/**
 * request reducer initial state
 *
 * @type {InitialStateTypes}
 */
const initialState: InitialStateTypes = {
  isLoading: undefined,
  response: undefined,
  error: undefined,
};

/**
 * the request reducer
 *
 * @param {Object} state state
 * @param {Object} action action
 * @returns {Object} new state
 */
function requestReducer(state: any = initialState, action: ActionType) {
  switch (action.type) {
    case AXIOS_HOOK_ACTIONS.START:
      return {
        ...state,
        isLoading: true,
      };
    case AXIOS_HOOK_ACTIONS.END:
      return {
        ...state,
        isLoading: false,
        response: action.payload,
        error: action.error,
      };
    default:
      return state;
  }
}

/**
 * Axios custom hook
 *
 * @param {UseAxiosConfigTypes} config custom hook parameters including axios config
 * @returns {Array} [{ isLoading, response, error }, request]
 */
export default function useAxios({
  afterMount = false,
  ...axiosConfig
}: UseAxiosConfigTypes = {}) {
  const cancelSourceRef = useRef<CancelTokenSource | undefined>(undefined);
  const unMountedRef = useRef<boolean>(false);
  const configRef = useRef<AxiosRequestConfig | undefined>(axiosConfig); // because 'axiosConfig' is primitive, at each render of the parent using this hook, we'll get a new reference.

  const [state, dispatch] = useReducer(requestReducer, initialState);

  /**
   * the request function that calls axios and dispatches actions
   *
   * @param {Object} config
   * @param {Object} source
   * @returns {void}
   */
  const request = useCallback(
    async (
      config: AxiosRequestConfig | undefined,
      source: CancelTokenSource | undefined
    ) => {
      try {
        if (source) {
          dispatch({ type: AXIOS_HOOK_ACTIONS.START });
          const response = await axios({
            ...config,
            cancelToken: source.token,
          });
          dispatch({
            type: AXIOS_HOOK_ACTIONS.END,
            payload: response,
          });
        }
      } catch (error: any) {
        if (!unMountedRef.current) {
          dispatch({ type: AXIOS_HOOK_ACTIONS.END, error });
        }
      }
    },
    []
  );

  useEffect(() => {
    cancelSourceRef.current = axios.CancelToken.source();

    if (afterMount) {
      request(configRef.current, cancelSourceRef.current);
    }
  }, [afterMount, request]);

  useEffect(
    () => () => {
      unMountedRef.current = true;

      if (cancelSourceRef.current) {
        cancelSourceRef.current.cancel();
      }
    },
    []
  );

  return [
    state,
    useCallback(
      (newConfig: UseAxiosConfigTypes) =>
        request(
          { ...configRef.current, ...newConfig },
          cancelSourceRef.current
        ),
      []
    ),
  ];
}
