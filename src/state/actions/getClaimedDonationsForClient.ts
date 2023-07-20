import { User } from "@state/index.types";
import railsAxios from "@util/railsAxios";
import { StatusCode } from "@state/index.types";

export const getClaimedDonationsForClient = async (jwt: string, user: User)=> {
  const endpoint = `/clients/${user.id}/get_claims?client_lat=${user.coords.latitude}&client_long=${user.coords.longitude}`;

  try {
    const { data, request } = await railsAxios(jwt).get(endpoint);
    const sortedClaimedDonations = data.sort((a, b) => a.created_at < b.created_at);

    return {
      claimedDonationsForClient: sortedClaimedDonations,
      responseStatus: request.status,
    };
  } catch (error: any) {
    return {
      responseStatus: {
        code: error.response.status as StatusCode,
        message: error.response.statusText,
      },
    };
  }
};

export default getClaimedDonationsForClient;
