import Axios from "axios";

export const postApi = () => {
    const path = 'https://jsonplaceholder.typicode.com/posts';

    return Axios.get(path);
};
