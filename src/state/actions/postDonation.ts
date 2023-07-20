import railsAxios from "@util/railsAxios";
import { User } from "@state/index.types";
import { NewDonation } from "@screens/DashboardScreen/DonationScreen/DonationScreen.type";

const postDonation = async (
  jwt: string, user: User, donation: NewDonation,
) => {
  const endpoint = "/donations/create";

  const payload = {
    donation: {
      donor_id: user.id,
      category: donation.category,
      food_name: donation.itemName,
      pickup_instructions: donation.pickupInstructions,
      status: "active",
      total_amount: donation.totalAmount,
    },
  };
  try {
    const { status, statusText } =  await railsAxios(jwt).post(endpoint, payload);

    return {
      code: status,
      message: statusText,
    };
  } catch (error: any) {
    return {
      responseStatus: {
        code: error.response.status,
        message: error.response.statusText,
      },
    };
  }
};

export { postDonation };
