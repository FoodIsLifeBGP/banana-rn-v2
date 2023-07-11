import getEnv from '@util/environment';
import { create } from 'zustand';
import { InitialState, Alert, StatusCode } from './index.types';
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
  email: undefined,
  password: undefined,
  responseStatus: undefined,
};

export interface GlobalState extends InitialState {
  updateAlert: (alert: Alert) => void,
  setResponseStatus: (statusCode: StatusCode) => void,
  setEmail: (email: string) => void,
  setPassword: (password: string) => void,
  clearEmailAndPassword: () => void,
  clearAlert: () => void,
  logIn: () => void,
  logOut: () => void,
}

const useGlobalStore = create<GlobalState>(set => ({
  ...initialState,
  updateAlert: alert => set(actions.updateAlert(alert)),
  setResponseStatus: statusCode => set(actions.setResponseStatus(statusCode)),
  clearAlert: () => set(actions.clearAlert()),
  logIn: () => set(state => actions.logIn(state)),
  logOut: () => set(actions.logOut()),
  setEmail: email => set(actions.setEmail(email)),
  setPassword: password => set(actions.setPassword(password)),
  clearEmailAndPassword: () => set({ email: undefined, password: undefined }),
}));
// Paste the following into your code to use global state & actions:

// import useGlobalStore from '@state';

// const email = useGlobalStore(state => state.email);
// const logIn = useGlobalStore(state => state.logIn);

export default useGlobalStore;
