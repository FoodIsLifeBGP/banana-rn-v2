import { Donation } from "@state/index.types";
import railsAxios from "@util/railsAxios";

export const getActiveDonationsFromDonor = async (jwt, user) => {
  const endpoint = `/donors/${user.id}/get_active_donations`;

  try {
    const { data, status, statusText } = await railsAxios(jwt).get(endpoint);
    const claimedAndActiveDonations: Donation[] = [...data.claimedtotal, ...data.activetotal];

    /* TODO: do we even need to sort this? */
    // const sortedDonations = claimedAndActiveDonations.sort((a, b) => a.created_at < b.created_at);

    return {
      activeDonationsFromDonor: claimedAndActiveDonations,
      responseStatus: {
        code: status,
        message: statusText,
      },
    };

  } catch (error: any) {
    console.log(error);
    return {
      responseStatus: {
        code: error.status,
        message: error.error,
      },
    };
  }
};
