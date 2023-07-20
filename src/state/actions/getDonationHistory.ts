import railsAxios from "@util/railsAxios";
import { User } from "@state/index.types";

export const getDonationHistory = async (jwt: string, user: User) => {
  const endpoint = `/donations/${user.id}/history_donations`;

  try {
    const response = await railsAxios(jwt).get(endpoint);
    const { data, request } = response;

    return {
      donationHistory: data,
      responseStatus: request.status,
    };
  } catch (error: any) {
    return {
      responseStatus: {
        code: status as StatusCode,,
        message: error.response.statusText,
      },
    };
  }
};
