import { createBrowserHistory } from 'history'
let domain = 'http://157.230.33.218:3000/'
// let domain = 'http://localhost:3000/'

export const Config = {
    serviceUrl: domain + 'admin/',
    imageUrl: domain,
    RequestTimeOut: 60000,
    history: createBrowserHistory(),
};