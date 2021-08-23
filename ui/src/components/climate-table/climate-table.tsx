import { CountryWeather } from "../../shared/interfaces";
import './climate-table.scss';

interface ClimateTableProps {
    weatherData: CountryWeather[] | undefined;
}

enum WeatherTableFields {
    TEMPERATURE,
    RAIN
}

function ClimateTable(props: ClimateTableProps) {

    function getBackground(type: WeatherTableFields, value: number) {
        switch (type) {
            case WeatherTableFields.TEMPERATURE:
                if (value >= 30) return '#FB4741';
                if (value >= 20) return '#2ADA7B';
                if (value >= 10) return '#3BB4DA';
                else return '#42A5FF';
            case WeatherTableFields.RAIN:
                if (value >= 50) return '#FB4741';
                if (value >= 40) return '#2ADA7B';
                if (value >= 30) return '#3BB4DA';
                else return '#42A5FF';
        }
        // TODO: Change this.
    }

    return (
        <div id='weather-data'>
            <div id='field-name'>
                <div className='field'>Avg Temp</div>
                <div className='field'>Rain</div>
            </div>
            {props.weatherData?.map((weatherData, i) =>
                <div key={i}>
                    <div className='month'>{weatherData.month.slice(0, 3)}</div>
                    <div className='weather-data' style={{ background: getBackground(WeatherTableFields.TEMPERATURE, weatherData.tAvg) }}>
                        <span>{weatherData.tAvg} °C</span>
                    </div>
                    <div className='weather-data' style={{ background: getBackground(WeatherTableFields.RAIN, weatherData.pAvg) }}>
                        <span>{weatherData.pAvg}mm</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ClimateTable;