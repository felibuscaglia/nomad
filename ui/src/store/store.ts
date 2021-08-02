import { Job } from "../shared/interfaces";
import { makeAutoObservable, observable } from 'mobx';
import axios from 'axios';

class Store {
     jobs: Job[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getAllJobs() {
        if (this.jobs.length) return;

        axios.get('/job/')
            .then(jobDTO => {
                if (typeof jobDTO === 'object') this.jobs = jobDTO.data;
            })
            .catch(err => console.error(err));
    }

}

const store = new Store();

export default store;