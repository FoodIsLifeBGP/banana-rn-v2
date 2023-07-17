import { GlobalState } from "@state/index";
import { Claim, Donation } from "@state/index.types";
import railsAxios from "@util/railsAxios";
import { StatusCode } from "@state/index.types";

export const getClaimedDonationsForClient = async (state: GlobalState)=> {
  const { jwt, user } = state;

  if (user && user.coords) {
    const endpoint = `/clients/${user.id}/get_claims?client_lat=${user.coords.latitude}&client_long=${user.coords.longitude}`;

    try {
      const response = await railsAxios(jwt).get(endpoint);
      const { data, request } = response;

      const sortedData = data.sort(
        (a, b) => a.created_at < b.created_at,
      );
      if (sortedData) {
        const claimedDonations = sortedData;
        return {
          donationsOrClaims: claimedDonations,
          responseStatus: request.status,
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        donationsOrClaims: <Claim[] | Donation[]>[],
        responseStatus: { code: <StatusCode["code"]> 500 },
      };
    }
  }
  return {
    donationsOrClaims: <Claim[] | Donation[]>[],
    responseStatus: { code: <StatusCode["code"]> 500 },
  };
};

export default getClaimedDonationsForClient;
