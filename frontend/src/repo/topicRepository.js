import Repository from "./repository";
import Axios from "axios";
import { JWTUtil } from "../utils/jwt";

export default class TopicRepository extends Repository {

    constructor(url) {
        super(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_PORT}/topics`);
    }

    addVote(id) {
        const url = `${this.url}/${id}/voteup`
        return Axios.post(url,null,
            {
                headers: {
                    user: JSON.stringify(JWTUtil.getUser())
                }
            }
        );
    }

    add(data) {
        const url = `${this.url}?name=${data.name}&description=${data.description}`;
        return Axios.post(url, data,
            { 
                headers: {
                    user: JWTUtil.getUser().name
                }
            } 
        );
    }

    edit(data) {
        const url = `${this.url}/${data.id}`;
        return Axios.patch(url, data);
    }
}

export const TopicRepo = new TopicRepository();