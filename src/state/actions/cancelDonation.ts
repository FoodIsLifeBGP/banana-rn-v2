import { GlobalState } from "@state/index";
import railsAxios from "@util/railsAxios";

export const cancelDonation = (
  state: GlobalState,
  donationId: number,
): GlobalState => {
  const endpoint = `/donations/${donationId}/update`;
  const { jwt } = state;
  const payload = {
    donation: {
      id: donationId,
      status: "deleted",
    },
  };

  const cancelDonationAsync = async () => {
    try {
      const response = await railsAxios(jwt).patch(endpoint, payload);
      return { responseStatus: response.request.status || "Error" };
    } catch (error: any) {
      return { responseStatus: 500 };
    }
  };

  cancelDonationAsync();

  return state;
};

export default cancelDonation;
