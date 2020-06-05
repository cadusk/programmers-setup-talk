import Repository from "./repository";
import Axios from "axios";

export default class TopicRepository extends Repository {

    constructor(url) {
        super('http://localhost:3333/topics');
    }

    addVote(id) {
        const url = `${this.url}/${id}/voteup`
        return Axios.post(url);
    }

    add(data) {
        const url = `${this.url}?name=${data.name}&description=${data.description}`;
        return Axios.post(url, data);
    }

    edit(data) {
        const url = `${this.url}/${data.id}`;
        return Axios.patch(url, data);
    }
}

export const TopicRepo = new TopicRepository();