import { GlobalState } from '@state/index';
import railsAxios from '@util/railsAxios';

export const getClaimHistoryForClient = (state: GlobalState) => {
  const { jwt, user } = state;

  if (user) {
    const endpoint = `/clients/${user.id}/claims_history`;

    const getClaimHistoryAsync = async () => {
      try {
        const response = await railsAxios(jwt).get(endpoint);
        const { data } = response;

        const sortedData = data.sort((a, b) => a.created_at < b.created_at);
        if (sortedData) {
          return { claimHistory: sortedData };
        }
      } catch (error: any) {
        console.log(error);
        return { claimHistory: [] };
      }
      return { claimHistory: [] };
    };

    return getClaimHistoryAsync();
  }

  return state;
};

export default getClaimHistoryForClient;
