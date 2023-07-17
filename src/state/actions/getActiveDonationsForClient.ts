import { GlobalState } from "@state/index";
import { Claim, Donation } from "@state/index.types";
import railsAxios from "@util/railsAxios";

export const getActiveDonationsForClient = async (state: GlobalState) => {
  const { jwt, user } = state;

  if (user && user.coords) {
    const endpoint = `/donations/active?client_lat=${user.coords.latitude}&client_long=${user.coords.longitude}`;

    try {
      const { data, request } = await railsAxios(jwt).get(endpoint);

      const sortedData = data.sort(
        (a, b) => a.created_at < b.created_at,
      );
      if (sortedData) {
        const activeDonations = sortedData.filter(
          (donation) => donation.status === "active",
        );
        return {
          donationsOrClaims: activeDonations,
          responseStatus: request.status,
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        donationsOrClaims: <Claim[] | Donation[]>[],
        responseStatus: 500,
      };
    }
  }
  //TODO: this feels redundant?
  return {
    donationsOrClaims: <Claim[] | Donation[]>[],
    responseStatus: 500,
  };
};

export default getActiveDonationsForClient;
