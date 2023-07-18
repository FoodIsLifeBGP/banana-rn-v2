import { GlobalState } from "@state/index";
import railsAxios from "@util/railsAxios";

export const claimDonation = async (
  jwt: string,
  donationId: number,
  clientId: number,
): Promise<Partial<GlobalState>> => {
  const endpoint = `/donations/${donationId}/claim`;
  const payload = { client_id: clientId };

  try {
    const { request, data } = await railsAxios(jwt).post(endpoint, payload);
    return {
      responseStatus: request.status,
      currentClaim: data.claim,
    };
  } catch (error: any) {
    return {
      responseStatus: {
        code: error.response.status,
        message: error.response.message,
      },
    };
  }
};

export default claimDonation;
