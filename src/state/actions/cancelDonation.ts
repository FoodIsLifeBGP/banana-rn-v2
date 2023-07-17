import { GlobalState } from "@state/index";
import railsAxios from "@util/railsAxios";
import { StatusCode } from "@state/index.types";

export const  cancelDonation = async (
  { jwt }: GlobalState,
  donationId: number,
): Promise<Partial<GlobalState>> => {
  const endpoint = `/donations/${donationId}/update`;

  const payload = {
    donation: {
      id: donationId,
      status: "deleted",
    },
  };

  const { request } = await railsAxios(jwt).patch(endpoint, payload);
  return { responseStatus: { code: <StatusCode["code"]> request.status || 500 } };
};

export default cancelDonation;
