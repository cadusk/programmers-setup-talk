import Axios from 'axios';

export default class Repository {
    constructor(url) { 
        this.url = url;
    }

    get(optionalUrl = null) {
        const url = optionalUrl ? optionalUrl : this.url;
        return Axios.get(url);
    }

    getById(id, optionalUrl = null) {
        const url = optionalUrl ? optionalUrl : `${this.url}/${id}`;
        return Axios.get(url);
    }

    add(data, optionalUrl = null) {
        const url = optionalUrl ? optionalUrl : this.url;
        return Axios.post(url, data);
    }

    edit(data, optionalUrl = null) {
        const url = optionalUrl ? optionalUrl : `${this.url}/${data.id}`;
        return Axios.put(url, data);
    }

    remove(id, optionalUrl = null) {
        const url = optionalUrl ? optionalUrl : `${this.url}/${id}`;
        const response = { hasError: false, data: ""}
        return Axios.delete(url).then(
            () => {
                return response;
             },
            (error) => {
                if(error.response.data) {
                    response.data = error.response.data.message;
                }
                response.hasError = true;
                return response;

            }
          );;
    }
}