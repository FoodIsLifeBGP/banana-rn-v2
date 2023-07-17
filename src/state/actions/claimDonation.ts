import { GlobalState } from "@state/index";
import railsAxios from "@util/railsAxios";
import { StatusCode } from "@state/index.types";

export const claimDonation = async (
  { jwt }: GlobalState,
  donationId: number,
  clientId: number,
): Promise<Partial<GlobalState>> => {
  const endpoint = `/donations/${donationId}/claim`;
  const payload = { client_id: clientId };

  try {
    const { request, data } = await railsAxios(jwt).post(endpoint, payload);
    return {
      responseStatus: request.status,
      claim: data.claim,
    };
  } catch (error: any) {
    return {
      responseStatus: { code: <StatusCode["code"]> 500 },
      claim: undefined,
    };
  }
};

export default claimDonation;
