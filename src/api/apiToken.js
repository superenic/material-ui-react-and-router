import api from "./paths";
import Axios from "axios";

/**
 * @param {username:string, password:string} user attributes minimun username and password
 */
export const createToken = (user) => {
    return Axios({...api.openSession, data: {...api.openSession.data, ...user}});
}