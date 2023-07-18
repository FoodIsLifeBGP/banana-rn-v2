import railsAxios from "@util/railsAxios";
import { UserIdentity } from "@state/index.types";
import { DonorRegisterProps, ClientRegisterProps } from "@state/index.types";

export const registerDonor = async (
  createUrl, userIdentity: UserIdentity, donor: DonorRegisterProps,
) => {
  const {
    email,
    password,
    firstName,
    lastName,
    businessName,
    businessAddress,
    city,
    state,
    zip,
    pickupInstructions,
  } = donor;

  try {
    const { data, request } = await railsAxios().post(createUrl,
      JSON.stringify({
        [userIdentity]: {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          organization_name: businessName,
          address_street: businessAddress,
          address_city: city,
          address_state: state,
          address_zip: zip,
          pickup_instructions: pickupInstructions,
        },
      }));

    return {
      jwt: data?.jwt || "",
      user: data?.client || {},
      responseStatus: { code: request.status },
    };
  } catch (error: any) {
    return {
      responseStatus: {
        code: error.response.status,
        message: error.response.message,
      },
    };
  }
};

export const registerClient = async (
  createUrl, userIdentity: UserIdentity, client: ClientRegisterProps,
) => {
  const {
    email,
    password,
    firstName,
    lastName,
  } = client;

  try {
    const { data, request } = await railsAxios().post(createUrl,
      JSON.stringify({
        [userIdentity]: {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        },
      }));

    return {
      jwt: data?.jwt || "",
      user: data?.client || {},
      responseStatus: { code: request.status },
    };
  } catch (error: any) {
    return {
      responseStatus: {
        code: error.response.status,
        message: error.response.message,
      },
    };
  }
};

const register = (
  createUrl, userIdentity, userToRegister,
) => {
  return userIdentity === "donor"
    ? registerDonor(
      createUrl, userIdentity, userToRegister,
    )
    : registerClient(
      createUrl, userIdentity, userToRegister,
    );
};

export { register };
