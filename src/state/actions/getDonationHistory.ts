import railsAxios from '@util/railsAxios';

export const getDonationHistory = (state) => {
  const {jwt, user} = state;

  if (user) {
    const endpoint = `/donations/${user.id}/history_donations`;

    railsAxios(jwt).get(endpoint)
      .then((response) => {
        const { data } = response;
        if (data) {
          state.set({ donationHistory: data });
        }
      })
      .catch((error) => {
        console.error(error);
        state.set({ donationHistory: [] });
      });
  }
};
