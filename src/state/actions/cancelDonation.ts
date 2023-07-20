import railsAxios from "@util/railsAxios";

export const cancelDonation = async (jwt: string, donationId: number) => {
  const endpoint = `/donations/${donationId}/update`;

  const payload = {
    donation: {
      id: donationId,
      status: "deleted",
    },
  };

  const { status, statusText } = await railsAxios(jwt).patch(endpoint, payload);
  return {
    responseStatus: {
      code: status,
      message: statusText,
    },
  };
};

export default cancelDonation;
