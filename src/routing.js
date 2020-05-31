export const routingPath = [
    {
        name: 'home',
        path: '/'
    },
    {
        name: 'forgotPassword',
        path: '/forgot_password',
    }
];

let findRoute = (name) => routingPath.find(i => i.name === name);;

export default findRoute;