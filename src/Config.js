import { createBrowserHistory } from 'history'
let domain = 'http://128.199.236.30:3001/'
// let domain = 'http://localhost:3000/'
// let domain = 'http://139.162.50.22:3000/'

export const Config = {
    serviceUrl: domain + 'admin/',
    imageUrl: domain,
    RequestTimeOut: 60000,
    history: createBrowserHistory(),
};
