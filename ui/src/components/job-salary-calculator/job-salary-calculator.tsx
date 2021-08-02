import './job-salary-calculator.scss';
import store from '../../store/store';

function JobSalaryCalculator() {
    return (
        <div id='job-salary-title'>
            <h3>Job Salary Calculator</h3>
            <select name='jobs'>
                {store.jobs && store.jobs.map(job => <option>{job.title}</option>)}
            </select>
        </div>
    )
}

export default JobSalaryCalculator;