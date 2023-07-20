import railsAxios from "@util/railsAxios";
import { StatusCode, User } from "@state/index.types";

export const getClaimHistoryForClient = async (jwt: string, user: User) => {
  const endpoint = `/clients/${user.id}/claims_history`;

  try {
    const { data, request } = await railsAxios(jwt).get(endpoint);
    const sortedData = data.sort((a, b) => a.created_at < b.created_at);

    return {
      claimHistory: sortedData,
      responseStatus: request.status,
    };
  } catch (error: any) {
    console.log(error);
    return {
      claimHistory: [],
      responseStatus: {
        code: error.response.status as StatusCode,
        message: error.response.statusText,
      },
    };
  }
};

export default getClaimHistoryForClient;
