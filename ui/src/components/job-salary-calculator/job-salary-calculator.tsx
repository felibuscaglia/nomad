import './job-salary-calculator.scss';
import store from '../../store/store';
import axios from 'axios';
import React, { useState } from 'react';
import { Salary } from '../../shared/interfaces';
import CircularProgress from '@material-ui/core/CircularProgress';

interface JobSalaryCalculatorProps {
    entityID: string;
    entityName: string;
    entityType: string;
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
        if (!id || !title || !props?.entityID) return setSalary(null);

        axios.get<Salary>(`salary/?jobID=${id}&entityID=${props?.entityID}&entityType=${props?.entityType}`)
            .then(salaryDTO => setSalaryAndStopLoading(salaryDTO?.data?.salary ?? null))
            .catch(err => setSalaryAndStopLoading(null));
    }

    function setSalaryAndStopLoading(value: number | null) {
        setSalary(value);
        setLoading(false);
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
                            <h1>{salary === null ? 'N/A' : `U$D ${salary?.toLocaleString()}`}</h1> 
                            <span>Average annual salary for a(n) <b>{job}</b> in <b>{props?.entityName}</b></span>
                        </React.Fragment>
                }
            </div>
        </div>
    )
}

export default JobSalaryCalculator;