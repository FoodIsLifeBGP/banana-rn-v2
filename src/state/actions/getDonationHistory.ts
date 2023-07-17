import railsAxios from "@util/railsAxios";
import { StatusCode } from "@state/index.types";
import { GlobalState } from "@state/index";

export const getDonationHistory = async ({ jwt, user }: Partial<GlobalState>) => {
  if (user) {
    const endpoint = `/donations/${user.id}/history_donations`;

    try {
      const response = await railsAxios(jwt).get(endpoint);
      const { data, request } = response;

      return {
        donationHistory: data,
        responseStatus: request.status,
      };
    } catch (error: any) {
      console.log(error);
      return {
        donationHistory: [],
        responseStatus: { code: <StatusCode["code"]> 500 },
      };
    }
  }
  return {
    donationHistory: [],
    responseStatus: { code: <StatusCode["code"]> 500 },
  };
};
