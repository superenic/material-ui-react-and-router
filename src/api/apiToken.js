import api from "./paths";
import Axios from "axios";

/**
 * @param {FormData} user attributes minimun username and password
 */
export const createToken = (user) => Axios({...api.openSession, data: user});