import axios from 'axios';
import { Config } from './Config';
const { history } = Config

export async function PostWithToken(url, json, callback) {
    let token = localStorage.getItem('token');
    if (!!!token) return callback('No token')
    let instance = axios.create({
        baseURL: Config.serviceUrl,
        timeout: Config.RequestTimeOut,
        headers: { 'x-access-token': token }
    });
    await instance.post(url, json)
        .then((res) => {
            let { data } = res
            if (data.ResponseCode === 1) return callback(null, data.data);
            callback(data.ResponseText, data)
        })
        .catch((error) => callback(error))
}

export async function PostNoToken(url, json, callback) {
    let instance = axios.create({
        baseURL: Config.serviceUrl,
        timeout: Config.RequestTimeOut,
    });
    await instance.post(url, json)
        .then((res) => {
            let { data } = res
            if (data.ResponseCode === 1) return callback(null, data.data);
            callback(data.ResponseText, data)
        })
        .catch((error) => callback(error))
}

export async function GetWithToken(url, callback) {
    let token = localStorage.getItem('token');
    if (!!!token) return callback('No token')
    let instance = axios.create({
        baseURL: Config.serviceUrl,
        timeout: Config.RequestTimeOut,
        headers: { 'x-access-token': token }
    });
    await instance.get(url)
        .then((res) => {
            let { data } = res
            if (data.ResponseCode === 1) return callback(null, data.data);
            callback(data.ResponseText, data)
        })
        .catch((error) => callback(error))
}


export async function GetNoToken(url, callback) {
    // var token = localStorage.getItem('token');
    let instance = axios.create({
        baseURL: Config.serviceUrl,
        timeout: Config.RequestTimeOut,
    });
    await instance.get(url)
        .then((res) => {
            let { data } = res
            if (data.ResponseCode === 1) return callback(null, data.data);
            callback(data.ResponseText, data)
        })
        .catch((error) => callback(error))
}

export async function UploadFile(url, acceptedFiles, callback, cb) {
    let token = localStorage.getItem('token');
    if (!!!token) return callback('No token')
    let data = new FormData();
    let file = acceptedFiles[0];
    data.append('files', file, file.name);
    let instance = axios.create({
        baseURL: Config.serviceUrl,
        timeout: Config.RequestTimeOut * 3,
        headers: {
            'content-type': 'multipart/form-data',
            'x-access-token': token
        },
        onUploadProgress: (progressEvent) => {
            let t = Math.floor(progressEvent.loaded / progressEvent.total * 100)
            if (cb) cb(t);
        }
    });

    await instance.post(url, data)
        .then((res) => {
            let { data } = res
            if (data.ResponseCode === 1) return callback(null, data.data);
            callback(data.ResponseText, data)
        })
        .catch((error) => callback(error))
}
// export function DowloadFile(url, json, callback) {
//     window.$("body").append('<div class="downexcel"><div><i style="font-size: 100px;" class="fa fa-spinner spin"></i><br/><p>Đang sử lý file vui lòng đợi trong giây lát.. !</p></div></div>');
//     var token = localStorage.getItem('token');
//     var instance = axios.create({
//         baseURL: Config.serviceUrl,
//         timeout: 50000,
//         headers: { 'x-access-token': token }
//     });
//     instance.post(url, json).then(function (response) {
//         callback(response.data);
//         setTimeout(() => {
//             window.$(".downexcel").remove()
//         }, 1000)
//     }).catch(function (error) {
//         window.$(".downexcel").remove()
//         if (error.response) {
//             if (error.response.status === 403) {
//                 // window.location.replace("/403");
//                 console.log(url)

//                 history.push("/403");
//             }
//             if (error.response.status === 500) {
//                 console.log('500')
//             }
//         } else if (error.request) {
//             console.log(error.request);
//         } else {
//             console.log('Error', error.message);
//         }
//     })
// }