import getEnv from "@util/environment";
import { create } from "zustand";
import {
  Alert,
  InitialState,
  StatusCode,
  Claim,
  Donation,
} from "./index.types";
import * as actions from "./actions";

const {
  USER_IDENTITY, API_BASE_URL, LOGIN_URL, CREATE_URL,
} = getEnv();

export const initialState: InitialState = {
  jwt: undefined,
  user: undefined,
  claim: undefined,
  email: undefined,
  alert: undefined,
  password: undefined,
  loginUrl: LOGIN_URL,
  createUrl: CREATE_URL,
  apiBaseUrl: API_BASE_URL,
  userIdentity: USER_IDENTITY,
  donationsOrClaims: <Claim[] | Donation[]>[],
  responseStatus: undefined,
};

export interface GlobalState extends InitialState {
  updateAlert: (alert: Alert) => void;
  setResponseStatus: (statusCode: StatusCode) => void;
  clearEmailAndPassword: () => void;
  clearAlert: () => void;
  logIn: (state: GlobalState) => Promise<void>;
  logOut: () => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  cancelDonation: (state: GlobalState, donationId: number) => void;
  claimDonation: (state: GlobalState, donationId: number, clientId: number) => void;
  getActiveDonationsForClient: (state: GlobalState) => void;
  getClaimedDonationsForClient: (state: GlobalState) => void;
  getClaimHistoryForClient: (state: GlobalState) => void;
  getDonationHistory: (state: GlobalState) => void;
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
  claimDonation: async (state, donationId, clientId)  => {
    const { responseStatus, claim } = await actions.claimDonation(state, donationId, clientId);
    set({
      claim,
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
