import Repository from "./repository";
import Axios from "axios";
import { JWTUtil } from "../utils/jwt";

export default class TopicRepository extends Repository {

    constructor(url) {
        super(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_PORT}/topics`);
    }

    addVote(id) {
        const url = `${this.url}/${id}/voteup`
        let response = {
            data: "",
            hasError: false
        }
        return Axios.post(url,null,
            {
                headers: {
                    user: JWTUtil.getUser().email
                }
            }
        ).then(
            (res) => {
                response.data = res.data
                return response;
            },
            (error) => {
            if(error.response.data.error) {
                response.data = error.response.data.error;
            }else {
                response.data = error.response.data.message;
            }
                response.hasError = true;
                return response;
            }
          );;
    }

    add(data) {
        const url = `${this.url}?name=${data.name}&description=${data.description}`;
        const response = {hasError: false, data: ""}

        return Axios.post(url, data,
            { 
                headers: {
                    user: JWTUtil.getUser().email
                }
            } 
        ).then(
            () => {
                return response;
            },
            (error) => {
                if(error.response.data) {
                    response.data = error.response.data.message
                }
                response.hasError = true;
                return response;
            }
          );
    }

    edit(data) {
        const url = `${this.url}/${data.id}`;
        const response = {hasError: false, data: ""}
        
        return Axios.patch(url, data).then(
            () => {
                return response;
            },
            (error) => {
                if(error.response.data) {
                    response.data = error.response.data.message
                }
                response.hasError = true;
                return response;
            }
          );
    }
}

export const TopicRepo = new TopicRepository();