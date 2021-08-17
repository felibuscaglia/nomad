import { Country, Job } from "../shared/interfaces";
import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class Store {
    jobs: Job[] = [];
    countriesForHomepage: Country[] = [];

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

    getCountriesForHomepage() {
        if (this.countriesForHomepage.length) return;

        axios.get('/countries/random')
            .then(countries => this.countriesForHomepage = countries.data)
            .catch(err => console.error(err));
    }

}

const store = new Store();

export default store;