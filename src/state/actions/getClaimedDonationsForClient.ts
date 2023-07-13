import { GlobalState } from '@state/index';
import { Claim, Donation } from '@state/index.types';
import railsAxios from '@util/railsAxios';

export const getClaimedDonationsForClient = (state: GlobalState) => {
  const { jwt, user } = state;

  if (user) {
    if ('coords' in user && user.coords) {
      const endpoint = `/clients/${user.id}/get_claims?client_lat=${user.coords.latitude}&client_long=${user.coords.longitude}`;

      const getClaimedDonationsAsync = async () => {
        try {
          const response = await railsAxios(jwt).get(endpoint);
          const { data } = response;

          const sortedData = data.sort((a, b) => a.created_at < b.created_at);
          if (sortedData) {
            const claimedDonations = sortedData;
            return { donationsOrClaims: claimedDonations };
          }
        } catch (error: any) {
          console.log(error);
          return { donationsOrClaims: <Claim[]|Donation[]>[] };
        }
        return [];
      };

      getClaimedDonationsAsync();

    } else {
      return { donationsOrClaims: <Claim[]|Donation[]>[] };
    }
  }

  return state;
};

export default getClaimedDonationsForClient;
