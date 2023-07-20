import getEnv from "@util/environment";
import { create } from "zustand";
import {
  Alert,
  InitialState,
  ResponseStatus,
  UserIdentity,
  ClientOrDonorRegisterProps,
  User,
  Donation,
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
  activeDonationsForClient: [],
  currentClaim: undefined,
  claimedDonation: undefined,
  responseStatus: {
    code: 418,
    message: "No API calls made yet.",
  },
};

export interface GlobalState extends InitialState {
  updateAlert: (alert: Alert) => void;
  setResponseStatus: (statusCode: ResponseStatus) => void;
  clearEmailAndPassword: () => void;
  clearAlert: () => void;
  logIn: (state: GlobalState) => void;
  logOut: () => void;
  setEmail: (email: string) => void;
  setClaimedDonation: (claimedDonation?: Donation) => void;
  setPassword: (password: string) => void;
  cancelDonation: (jwt: string, donationId: number) => void;
  claimDonation: (jwt: string, donationId: number, clientId: number) => void;
  getActiveDonationsForClient: (jwt: string, user: User) => void;
  getClaimedDonationsForClient: (jwt: string, user: User) => void;
  getClaimHistoryForClient: (jwt: string, user: User) => void;
  getDonationHistory: (jwt: string, user: User) => void;
  registerUser: (userIdentity: UserIdentity, createUrl: string, userToRegister: ClientOrDonorRegisterProps ) => void;
  scanQrCode: (jwt: string, qrCode: string) => void;
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
  cancelDonation: async (jwt, donationId) => {
    const { responseStatus } = await actions.cancelDonation(jwt, donationId);
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
  getActiveDonationsForClient: async (jwt, user)  => {
    const { activeDonationsForClient, responseStatus } = await actions.getActiveDonationsForClient(jwt, user);
    set({
      activeDonationsForClient,
      responseStatus,
    });
  },
  getClaimedDonationsForClient: async (jwt, user)  => {
    const { claimedDonationsForClient, responseStatus } = await actions.getClaimedDonationsForClient(jwt, user);
    set({
      claimedDonationsForClient,
      responseStatus,
    });
  },
  getClaimHistoryForClient: async (jwt, user)  => {
    const { claimHistory, responseStatus } = await actions.getClaimHistoryForClient(jwt, user);
    set({
      claimHistory,
      responseStatus,
    });
  },
  getDonationHistory: async (jwt, user)  => {
    const { donationHistory, responseStatus } = await actions.getDonationHistory(jwt, user);
    set({
      donationHistory,
      responseStatus,
    });
  },
  registerUser: async (
    userIdentity, createUrl, userToRegister,
  )  => {
    if (userIdentity && createUrl) {
      const { jwt, user, responseStatus } = await actions.registerUser(
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
  scanQrCode: async (jwt, qrCode)  => {
    if (qrCode) {
      const { responseStatus } = await actions.scanQrCode(jwt, qrCode);
      set({ responseStatus });
    } else {
      set({
        responseStatus: {
          code: 400,
          message: "Client side error in `scanQrCode()` method",
        },
      });
    }
  },
  setClaimedDonation: (claimedDonation)  => {
    set({ claimedDonation });
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
