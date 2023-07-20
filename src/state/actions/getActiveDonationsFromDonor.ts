import railsAxios from "@util/railsAxios";

export const getActiveDonationsFromDonor = async (jwt, user) => {
  const endpoint = `/donors/${user.id}/get_active_donations`;

  try {
    const { data, status, statusText } = await railsAxios(jwt).get(endpoint);
    const sortedData = data.sort((a, b) => a.created_at < b.created_at);

    return {
      activeDonationsFromDonor: sortedData,
      responseStatus: {
        code: status,
        message: statusText,
      },
    };

  } catch (error: any) {
    console.log(error);
    return {
      responseStatus: {
        code: error.response.status,
        message: error.response.statusText,
      },
    };
  }
};
