import railsAxios from "@util/railsAxios";
import { User } from "@state/index.types";

export const getClaimHistoryForClient = async (jwt: string, user: User) => {
  const endpoint = `/clients/${user.id}/claims_history`;

  try {
    const { data, status, statusText } = await railsAxios(jwt).get(endpoint);
    const sortedClaims = data.closed_claims.sort((a, b) => a.created_at < b.created_at);

    return {
      claimHistory: sortedClaims,
      responseStatus: {
        code: status,
        message: statusText,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      claimHistory: [],
      responseStatus: {
        code: error.response.status,
        message: error.response.statusText,
      },
    };
  }
};

export default getClaimHistoryForClient;
