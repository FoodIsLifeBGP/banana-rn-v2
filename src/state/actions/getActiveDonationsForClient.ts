import { GlobalState } from '@state/index';
import { Claim, Donation } from '@state/index.types';
import railsAxios from '@util/railsAxios';

export const getActiveDonationsForClient = (state: GlobalState) => {
  const { jwt, user } = state;

  if (user && user.coords) {
    const endpoint = `/donations/active?client_lat=${user.coords.latitude}&client_long=${user.coords.longitude}`;

    const getActiveDonationsAsync = async () => {
      try {
        const response = await railsAxios(jwt).get(endpoint);
        const { data } = response;

        const sortedData = data.sort((a, b) => a.created_at < b.created_at);
        if (sortedData) {
          const activeDonations = sortedData.filter((donation) => donation.status === 'active');
          return { donationsOrClaims: activeDonations };
        }
      } catch (error: any) {
        console.log(error);
        return { donationsOrClaims: <Claim[]|Donation[]>[] };
      }
      return [];
    };

    getActiveDonationsAsync();

  }
  return { donationsOrClaims: <Claim[]|Donation[]>[] };
}

export default getActiveDonationsForClient;
