import getEnv from '@util/environment';
import { create } from 'zustand';
import { InitialState, Alert } from './index.types';
import * as actions from './actions';

const {
  USER_IDENTITY,
  API_BASE_URL,
  LOGIN_URL,
  CREATE_URL,
} = getEnv();

export const initialState: InitialState = {
  userIdentity: USER_IDENTITY,
  apiBaseUrl: API_BASE_URL,
  loginUrl: LOGIN_URL,
  createUrl: CREATE_URL,
  alert: undefined,
  donationsOrClaims: [],
  jwt: undefined,
  user: undefined,
};


interface GlobalStore extends InitialState {
	bears: any
	updateAlert: (alert: Alert) => void,
  clearAlert: () => void,
  increasePopulation: (by: number) => void
	removeAllBears: () => void
	deleteEverything: () => void
}

const useGlobalStore = create<GlobalStore>()((set) => ({
  userIdentity: USER_IDENTITY,
  apiBaseUrl: API_BASE_URL,
  loginUrl: LOGIN_URL,
  createUrl: CREATE_URL,
  alert: undefined,
  donationsOrClaims: [],
  jwt: undefined,
  user: undefined,
  bears: 0,
  updateAlert: (alert: Alert) => set({ alert }),
  clearAlert: () => set({ alert: undefined }),
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  deleteEverything: () => set({}, true), // clears the entire store, actions included
}));


// Paste the following into your code to use global state & actions:

// import useGlobal from '@state';
// const [ state, actions ] = useGlobal;

// const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobalStore;
