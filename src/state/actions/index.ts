import {
  Claim, Donation, ResponseStatus,
} from "@state/index.types";

export interface Actions {
  getActiveDonationsForClient: () => Promise<Donation[]>;
  getClaimedDonationsForClient: () => Promise<Donation[] | Claim[]>;
  getDonations: () => Promise<Donation[]>;
  getClaimHistoryForClient: () => Promise<Claim[]>;
  getDonationHistory: () => Promise<Donation[]>;
  getLocation: () => Promise<{ latitude: number; longitude: number }>;
  logIn: () => Promise<ResponseStatus>;
  logOut: () => Promise<void>;
  postDonation: () => Promise<ResponseStatus>;
  registerUser: () => Promise<ResponseStatus>;
  scanQrCode: () => Promise<ResponseStatus>;
  requestResetToken: () => Promise<ResponseStatus>;
  submitResetToken: () => Promise<ResponseStatus>;
  submitNewPassword: () => Promise<ResponseStatus>;
  getTravelTimes: () => Promise<{ status: ResponseStatus; times: {} }>;
}
export { getActiveDonationsForClient } from "./getActiveDonationsForClient";
export { getClaimedDonationsForClient } from "./getClaimedDonationsForClient";
export { getClaimHistoryForClient } from "./getClaimHistoryForClient";
export { getDonations } from "./getDonations";
export { getDonationHistory } from "./getDonationHistory";
export { getLocation } from "./getLocation";
export {
  logIn, logOut, setEmail, setPassword,
} from "./auth";
export { postDonation } from "./postDonation";
export { cancelDonation } from "./cancelDonation";
export { claimDonation } from "./claimDonation";
export { getTravelTimes } from "./hereApi";
export { registerUser } from "./registerUser";
export { scanQrCode } from "./scanQrCode";
export {
  updateAlert, clearAlert, setResponseStatus,
} from "./alert";
export {
  requestResetToken,
  submitResetToken,
  submitNewPassword,
} from "./passwordReset";
