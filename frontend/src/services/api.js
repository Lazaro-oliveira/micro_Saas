import axios from 'axios';// biblioteca de requisições http


const baseApi = (baseURL) => {
    const api = axios.create({
        baseURL,
    });

    return api;
}


export default baseApi;