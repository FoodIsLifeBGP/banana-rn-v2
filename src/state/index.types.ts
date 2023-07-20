export interface SharedProps {
  id: number;
  email: string;
  password: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  account_status: string;
  coords: {
    latitude?: number;
    longitude?: number;
  };
}

export interface DonorState extends SharedProps {
  organization_name: string;
  business_license: string;
}

export interface ClientState extends SharedProps {
  transportation_method: string;
  ethnicity: string;
  gender: string;
}

export interface DonorRegisterProps {
  email: string;
  password: string;
  retypedPassword: string;
  firstName: string;
  lastName: string;
  businessName: string;
  businessAddress: string;
  city: string;
  state: string;
  zip: string;
  pickupInstructions: string;
  // license: string
  // licenseVerificationImage: any
}

export interface ClientRegisterProps {
  email: string;
  password: string;
  retypedPassword: string;
  firstName: string;
  lastName: string;
  // street: string;
  // city: string;
  // state: string;
  // zip: string;
  // transportationMethod: string;
  // ethnicity: string;
  // gender: string;
}

export type ClientOrDonorRegisterProps = ClientRegisterProps | DonorRegisterProps;

enum ClaimStatus {
  ACTIVE = "active",
  CLOSED = "closed",
  EXPIRED = "expired",
}

enum DonationStatus {
  ACTIVE = "active",
  CLAIMED = "claimed",
  CLOSED = "closed",
  DELETED = "deleted",
  EXPIRED = "expired",
}

enum DonationCategory {
  BREAD = "Bread",
  DAIRY = "Dairy",
  HOT_MEAL = "Hot Meal",
  PRODUCE = "Produce",
  PROTEIN = "Protein",
  OTHERS = "Others",
}

export interface Claim {
  client_id: number;
  client_name: string;
  donation_id: number;
  qr_code: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
  time_claimed: Date;
  canceled: boolean;
  status: ClaimStatus;
}

export interface Donation {
  id: string; /* TODO: make sure this is getting sent from backend */
  food_name: string;
  category: DonationCategory;
  measurement: string;
  per_person: number;
  total_servings: number;
  donor_id: number;
  duration_minutes: number;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  canceled: boolean;
  pickup_location: string;
  status: DonationStatus;
  claim: Claim;
}

/**
 * An alert to be displayed to the user.
 */
export interface Alert {
  /**
   * Title of the alert.
   */
  title: string;

  /**
   * Type of the alert.
   */
  type:
    | "default"
    | "incomplete form"
    | "coming soon"
    | "cancel donation"
    | "donation cancelled"
    | "donation published";

  /**
   * Message to the user.
   */
  message: string;

  /**
   * Whether the alert can be casually dismissed by the user
   * (i.e. tapping the content behind a modal).
   */
  dismissible?: boolean;

  cancelFn?: () => void;

  confirmFn?: () => void;
}

export type StatusCode = 200 | 201 | 202 | 400 | 403 | 401 | 404 | 409 | 418 | 500;

export interface ResponseStatus {
  message?: string;
  code: number; /* StatusCode; TODO: try to replace `number` w/ `StatusCode` in the future */
}

export type UserIdentity = "donor" | "client";

export type User = DonorState | ClientState;

export interface InitialState {
  userIdentity: UserIdentity;
  apiBaseUrl: string;
  loginUrl: string;
  createUrl: string;
  alert?: Alert;
  jwt?: string;
  user?: User;
  activeDonationsForClient?: Donation[];
  claimedDonationsForClient?: Donation[];
  claimHistory?: Claim[] /* TODO: double check this type */;
  donationHistory?: Donation[] /* TODO: double check this type */;
  activeDonationsFromDonor?: Donation[] /* TODO: double check this type */;
  email?: string;
  password?: string;
  responseStatus: ResponseStatus;
  currentClaim?: Claim;
  claimedDonation?: Donation;
  travelTimes: { /* TODO: double check this type.. */
    pedestrian: string;
    publicTransport: string;
    bicycle: string;
};
}

export interface Location {
  latitude: number;
  longitude: number;
}
