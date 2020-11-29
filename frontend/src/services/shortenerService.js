import baseApi from './api';


class shortenerService{
    constructor(){
        this.api = baseApi(process.env.REACT_APP_API);
    }

    async getLink(cod){
        const result = await this.api.get(`links/${cod}`);
        return result.data;
    }

    async getStats(cod){
        const result = await this.api.get(`links/${cod}/stats`);
        return result.data;
    }

    async generate(model){
        const result = await this.api.post('links', model);
        return result.data;
    }
}


export default shortenerService;