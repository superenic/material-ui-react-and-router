const urlBase = 'http://localhost:8019/';

export default {
    urlBase,
    openSession: {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: false,
        url: `${urlBase}oauth/token`,
        method: 'post',
        data: {
            grant_type: 'password',
            client_id: 2,
            client_secret: 'qkiMiSydcdVaeFBbhVVysg5mKQ1JYPLlvdCjB6tC',
            username: null,
            password: null,
        },
    },
};