import Repository from "./repository";
import Axios from "axios";

export default class TopicRepository extends Repository {

    constructor(url) {
        super('http://localhost:3333/topics');
    }

    addVote(id) {
        const url = `${this.url}/${id}/vote`
        return Axios.post(url);
    }
}

export const TopicRepo = new TopicRepository();