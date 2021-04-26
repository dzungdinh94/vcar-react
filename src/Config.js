import { createBrowserHistory } from 'history'
let domain = 'https://vcar-backend.herokuapp.com/'
// let domain = 'http://localhost:3000/'
// let domain = 'http://139.162.50.22:3000/'

export const Config = {
    serviceUrl: domain + 'admin/',
    imageUrl: domain,
    RequestTimeOut: 60000,
    history: createBrowserHistory(),
};
