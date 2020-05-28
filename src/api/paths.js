const urlBase = 'http://localhost:8019/';

export default {
    urlBase,
    openSession: {
        url: `${urlBase}oauth/token`,
        method: 'POST',
        data: {
            username: '',
            password: '',
        },
    },
};