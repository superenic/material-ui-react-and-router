export const routingPath = [
    {
        name: 'home',
        path: '/'
    },
];

let findRoute = (name) => routingPath.find(i => i.name === name);;

export default findRoute;