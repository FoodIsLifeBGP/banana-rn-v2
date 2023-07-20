import railsAxios from "@util/railsAxios";
import { GlobalState, initialState } from "@state/index";
// import { AxiosError } from "axios";

export const logIn = async ( state: GlobalState ): Promise<Partial<GlobalState>> => {
  const {
    loginUrl, userIdentity, email, password,
  } = state;

  try {
    const { data, status, statusText } = await railsAxios().post(loginUrl,
      JSON.stringify({
        [userIdentity]: {
          email,
          password,
        },
      }));

    return {
      jwt: data?.jwt || "",
      user: data?.[userIdentity] || undefined,
      responseStatus: {
        code: status,
        message: statusText,
      } /* TODO: define return types/methods for axios */,
    };
  /* TODO: add type for error below maybe AxiosError<any> */
  } catch (error: any) {
    return {
      jwt: "",
      user: undefined,
      responseStatus: {
        code: error.response.status,
        message: error.response.statusText,
      },
    };
  }
};

export const logOut = () => ({ ...initialState });

export const setEmail = (email) => ({ email });

export const setPassword = (password) => ({ password });
