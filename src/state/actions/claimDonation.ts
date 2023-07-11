import { GlobalState } from '@state/index';
import railsAxios from '@util/railsAxios';

export const claimDonation = (state: GlobalState, donationId: number, clientId: number): GlobalState => {
  const endpoint = `/donations/${donationId}/claim`;
  const { jwt } = state;
  const payload = { client_id: clientId };

  const claimDonationAsync = async () => {
    try {
      const response = await railsAxios(jwt).post(endpoint, payload);
      return { responseStatus: response.request.status, claim: response.data.claim };
    } catch (error: any) {
      return { responseStatus: 500 };
    }
  };

  claimDonationAsync();

  return state;
};

export default claimDonation;
