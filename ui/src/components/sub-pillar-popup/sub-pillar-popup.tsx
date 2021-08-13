import { Dialog } from "@material-ui/core";
import { CityPillars, SubPillar } from "../../shared/interfaces";
import { getPillarIcon } from "../../shared/utils";
import './sub-pillar-popup.scss';
import { CloseRounded, StarRounded, CheckCircle, RemoveCircle, Cancel } from '@material-ui/icons';

interface SubPillarProps {
    open: boolean;
    subPillars: SubPillar[];
    cityPillar: CityPillars,
    onClose: () => void,
    getID: (index: number) => string | undefined,
}

function SubPillarPopup(props: SubPillarProps) {

    const pillar = props.cityPillar?.pillar;

    function getPillarValue(subPillar: SubPillar) {
        switch (subPillar.type) {
            case 'currency_dollar':
                return `U$D ${Number(subPillar.value).toFixed(2).toLocaleString()} ${pillar?.name === 'Housing' ? 'per month' : ''}`;
            case 'int': case 'string':
                return subPillar.value;
            case 'percent':
                const numberValue = Number(subPillar.value);
                return `${(numberValue * 100).toFixed(2)} %`;
            case 'float':
                const nonFloatPillars = ['years', 'meters', 'Mbps'];
                const nonFloatPillarCheck = nonFloatPillars.some(name => subPillar?.name?.includes(name));
                if (nonFloatPillarCheck) {
                    return Math.round(Number(subPillar.value));
                } else {
                    return returnIcon(subPillar?.name?.includes('Teleport') ? 0.5 : 50, Number(subPillar.value));
                }
        }
    }


    function returnIcon(prom: number, value: number) {
        if (value > prom) return <CheckCircle className='check' />;
        else if (value < prom) return <Cancel className='negative' />;
        else return <RemoveCircle className='neutral' />;
    }

    function getDialogWidth() {
        if (pillar?.name === 'Tolerance' || pillar?.name === 'Taxation') return 'md';
        else return 'sm';
    }

    return (
        <Dialog open={props.open} id='dialog' onClose={props.onClose} maxWidth={getDialogWidth()} fullWidth>
            <div id='teleport-data'>
                <a href='https://teleport.org/cities/' target='_blank'>
                    <img height='25px' src='https://image.winudf.com/v2/image/b3JnLnRlbGVwb3J0LnRlbGVwb3J0bW9iaWxlX2ljb25fMF8yNDcwYjY3MQ/icon.png?w=&fakeurl=1' />
                    <span>via Teleport</span>
                </a>
                <CloseRounded className="close-btn" onClick={props.onClose} />
            </div>
            <h1>{getPillarIcon(pillar?.name)} {pillar?.name} | <StarRounded id='star-icon' /> {props.cityPillar?.score} </h1>
            {
                props.subPillars?.map((subPillar, index) =>
                    <div className='pillar' id={props.getID(index)} key={index}>
                        <span>{subPillar.name}</span>
                        <span id='subpillar-value'>{getPillarValue(subPillar)}</span>
                    </div>
                )
            }
        </Dialog>
    )
}

export default SubPillarPopup;