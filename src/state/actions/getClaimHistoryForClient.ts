import { GlobalState } from "@state/index";
import railsAxios from "@util/railsAxios";
import { ResponseStatus } from "@state/index.types";

export const getClaimHistoryForClient = async ({ jwt, user }: GlobalState) => {
  if (user) {
    const endpoint = `/clients/${user.id}/claims_history`;

    try {
      const response = await railsAxios(jwt).get(endpoint);
      const { data, request } = response;

      const sortedData = data.sort((a, b) => a.created_at < b.created_at);
      if (sortedData) {
        return {
          claimHistory: sortedData,
          responseStatus: request.status,
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        claimHistory: [],
        responseStatus: { code: <ResponseStatus["code"]> 500 },
      };
    }
  }
  return {
    claimHistory: [],
    responseStatus: { code: <ResponseStatus["code"]> 500 },
  };
};

export default getClaimHistoryForClient;
