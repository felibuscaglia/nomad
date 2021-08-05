import './job-salary-calculator.scss';
import store from '../../store/store';
import axios from 'axios';
import React, { useState } from 'react';
import { CountrySalary } from '../../shared/interfaces';
import CircularProgress from '@material-ui/core/CircularProgress';

interface JobSalaryCalculatorProps {
    countryID: string;
    countryName: string;
}

function JobSalaryCalculator(props: JobSalaryCalculatorProps) {

    const [salary, setSalary] = useState<number | null>(null);
    const [job, setJob] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [firstTime, setFirstTime] = useState(true);

    function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setLoading(true);
        const [id, title] = e.target.value.split(',');
        getJobSalary(id, title);
    }
    
    function getJobSalary(id: string, title: string) {
        setJob(title);
        if (!id || !title || !props?.countryID) return setSalary(null);

        axios.get<CountrySalary>(`salary-country/?jobID=${id}&countryID=${props.countryID}`)
            .then(salaryDTO => {
                setSalary(salaryDTO?.data?.salary ?? null);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }


    return (
        <div id='job-salary'>
            <div id='job-salary-title'>
                <h3>Job Salary Calculator</h3>
                <select name='jobs' onChange={(e) => handleSelectChange(e)}>
                    {store.jobs && store.jobs.map((job, i) => {
                        if (firstTime && i === 0) {
                            setFirstTime(false);
                            getJobSalary(String(job.id), job.title);
                        }
                        return <option key={i} value={`${job.id},${job.title}`}>{job.title}</option>
                    })}
                </select>
            </div>
            <div id='salary'>
                {
                    loading ?
                        <CircularProgress /> :
                        <React.Fragment>
                            <h1>{salary === null ? 'N/A' : `U$D ${ salary?.toLocaleString()}`}</h1>
                            <span>Average annual salary for a(n) <b>{job}</b> in <b>{props?.countryName}</b></span>
                        </React.Fragment>
                }
            </div>
        </div>
    )
}

export default JobSalaryCalculator;