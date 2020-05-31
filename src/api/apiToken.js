import api from './paths';
import Axios from 'axios';

/**
 * @param {username:string, password:string} user attributes minimun username and password
 */
export const createToken = (user) => {
  return Axios({
    ...api.openSession,
    data: { ...api.openSession.data, ...user },
  });
};

export const closeToken = (session) => {
  return Axios({
    ...api.closeSession,
    headers: {
      ...api.headers,
      Authorization: `Bearer ${session.access_token}`,
    },
  });
};

export const multiFactorAutentificationToken = (data) => {
  return Axios({ ...api.multifactorAuthentificaionToken, data: { ...data } });
};

export const verificarTokenApi = (data) => {
  return Axios({ ...api.verificarToken, data: { ...data } });
};
