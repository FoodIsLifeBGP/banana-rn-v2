import getEnv from "@util/environment";
import { create } from "zustand";
import {
  Alert,
  InitialState,
  ResponseStatus,
  Claim,
  Donation,
  UserIdentity,
  ClientOrDonorRegisterProps,
} from "./index.types";
import * as actions from "./actions";

const {
  USER_IDENTITY, API_BASE_URL, LOGIN_URL, CREATE_URL,
} = getEnv();

export const initialState: InitialState = {
  jwt: undefined,
  user: undefined,
  email: undefined,
  alert: undefined,
  password: undefined,
  loginUrl: LOGIN_URL,
  createUrl: CREATE_URL,
  apiBaseUrl: API_BASE_URL,
  userIdentity: USER_IDENTITY,
  donationsOrClaims: [],
  currentClaim: undefined,
  responseStatus: undefined,
};

export interface GlobalState extends InitialState {
  updateAlert: (alert: Alert) => void;
  setResponseStatus: (statusCode: ResponseStatus) => void;
  clearEmailAndPassword: () => void;
  clearAlert: () => void;
  logIn: (state: GlobalState) => void;
  logOut: () => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  cancelDonation: (state: GlobalState, donationId: number) => void;
  claimDonation: (state: GlobalState, donationId: number, clientId: number) => void;
  getActiveDonationsForClient: (state: GlobalState) => void;
  getClaimedDonationsForClient: (state: GlobalState) => void;
  getClaimHistoryForClient: (state: GlobalState) => void;
  getDonationHistory: (state: GlobalState) => void;
  register: (userIdentity: UserIdentity, createUrl: string, userToRegister: ClientOrDonorRegisterProps ) => void;
  scan: (jwt: string, qrCode: string) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  ...initialState,
  updateAlert: (alert) => set(actions.updateAlert(alert)),
  setResponseStatus: (statusCode) =>
    set(actions.setResponseStatus(statusCode)),
  clearAlert: () => set(actions.clearAlert()),
  logIn: async (state) => {
    const { jwt, user, responseStatus } = await actions.logIn(state);
    set({
      jwt,
      user,
      responseStatus,
    });
  },
  logOut: () => set(actions.logOut()),
  setEmail: (email) => set(actions.setEmail(email)),
  setPassword: (password) => set(actions.setPassword(password)),
  clearEmailAndPassword: () => set({
    email: undefined,
    password: undefined,
  }),
  cancelDonation: async (state, donationId) => {
    const { responseStatus } = await actions.cancelDonation(state, donationId);
    set({ responseStatus });
  },
  claimDonation: async (
    jwt, donationId, clientId,
  )  => {
    const { responseStatus, currentClaim } = await actions.claimDonation(
      jwt, donationId, clientId,
    );
    set({
      currentClaim,
      responseStatus,
    });
  },
  getActiveDonationsForClient: async (state)  => {
    const { donationsOrClaims, responseStatus } = await actions.getActiveDonationsForClient(state);
    set({
      donationsOrClaims,
      responseStatus,
    });
  },
  getClaimedDonationsForClient: async (state)  => {
    const { donationsOrClaims, responseStatus } = await actions.getClaimedDonationsForClient(state);
    set({
      donationsOrClaims,
      responseStatus,
    });
  },
  getClaimHistoryForClient: async (state)  => {
    const { claimHistory, responseStatus } = await actions.getClaimHistoryForClient(state);
    set({
      claimHistory,
      responseStatus,
    });
  },
  getDonationHistory: async (state)  => {
    const { donationHistory, responseStatus } = await actions.getDonationHistory(state);
    set({
      donationHistory,
      responseStatus,
    });
  },
  register: async (
    userIdentity, createUrl, userToRegister,
  )  => {

    if (userIdentity && createUrl) {
      const { jwt, user, responseStatus } = await actions.register(
        userIdentity, createUrl, userToRegister,
      );

      set({
        jwt,
        user,
        responseStatus,
      });
    } else {
      set({
        responseStatus: {
          code: 400,
          message: "Client side error in `register()` method",
        },
      });
    }
  },
  scan: async (jwt: string, qrCode: string)  => {

    if (jwt && qrCode) {
      const { responseStatus } = await actions.scan(jwt, qrCode);
      set({ responseStatus });
    } else {
      set({
        responseStatus: {
          code: 400,
          message: "Client side error in `scan()` method",
        },
      });
    }
  },
}));
/*
Paste the following into your code to use global state & actions:

```
import useGlobalStore from '@state';

const email = useGlobalStore(state => state.email);
const setEmail = useGlobalStore(state => state.setEmail);
```
 */

export default useGlobalStore;
