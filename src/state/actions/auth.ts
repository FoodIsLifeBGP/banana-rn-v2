import railsAxios from '@util/railsAxios';
import {GlobalState, initialState} from '@state/index';

export const logIn = (state): GlobalState => {
  const {
    loginUrl, userIdentity, email, password,
  } = state;

  const loginAsync = async () => {
    try {
      const response = await railsAxios().post(
        loginUrl,
        JSON.stringify({[userIdentity]: {email, password}}),
      );

      return {
        jwt: response.data?.jwt || '',
        user: response.data?.[userIdentity] || {},
        responseStatus: response.status,
      };
    } catch (error: any) {
      const e = error.toString().toLowerCase().split(' status code ');
      const responseStatus = e.length > 1
        ? parseInt(e.slice(-1), 10)
        : 418;
      return { responseStatus };
    }
  };

  loginAsync();

  return state;
};

export const logOut = () => ({ ...initialState });

export const setEmail = (email) => ({ email });

export const setPassword = (password) => ({ password });

