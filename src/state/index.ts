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
  userIdentity: USER_IDENTITY,
  apiBaseUrl: API_BASE_URL,
  loginUrl: LOGIN_URL,
  createUrl: CREATE_URL,
  alert: undefined,
  donationsOrClaims: <Claim[] | Donation[]>[],
  jwt: undefined,
  user: undefined,
  email: undefined,
  password: undefined,
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
  cancelDonation: (donationId: number) => void;
  claimDonation: (donationId: number, clientId: number) => void;
  getActiveDonationsForClient: () => void;
  getClaimedDonationsForClient: () => void;
  getClaimHistoryForClient: () => void;
  getDonationHistory: () => void;
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
  cancelDonation: (donationId) => set((state) => actions.cancelDonation(state, donationId)),
  claimDonation: (donationId, clientId) => set((state) => actions.claimDonation(state, donationId, clientId)),
  getActiveDonationsForClient: () => set((state) => actions.getActiveDonationsForClient(state)),
  getClaimedDonationsForClient: () => set((state) => actions.getClaimedDonationsForClient(state)),
  getClaimHistoryForClient: () => set((state) => actions.getClaimHistoryForClient(state)),
  getDonationHistory: () => (state) => actions.getDonationHistory(state),
}));

// Paste the following into your code to use global state & actions:

// import useGlobalStore from '@state';

// const email = useGlobalStore(state => state.email);
// const setEmail = useGlobalStore(state => state.setEmail);

export default useGlobalStore;
