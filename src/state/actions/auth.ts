import railsAxios from "@util/railsAxios";
import { GlobalState, initialState } from "@state/index";
import { ResponseStatus } from "@state/index.types";

export const logIn = async ( state: GlobalState ): Promise<Partial<GlobalState>> => {
  const {
    loginUrl, userIdentity, email, password,
  } = state;

  try {
    const response = await railsAxios().post(loginUrl,
      JSON.stringify({
        [userIdentity]: {
          email,
          password,
        },
      }));

    return {
      jwt: response.data?.jwt || "",
      user: response.data?.[userIdentity] || undefined,
      responseStatus: { code: <ResponseStatus["code"]>response.status } /* TODO: define return types/methods for axios */,
    };
  /* TODO: add type for error below */
  } catch (error: any) {
    const e = error.toString().toLowerCase().split(" status code ");
    const responseStatus =
      e.length > 1 ? parseInt(e.slice(-1), 10) : 418;
    return {
      jwt: "",
      user: undefined,
      responseStatus: { code: <ResponseStatus["code"]>responseStatus },
    };
  }
};

export const logOut = () => ({ ...initialState });

export const setEmail = (email) => ({ email });

export const setPassword = (password) => ({ password });
