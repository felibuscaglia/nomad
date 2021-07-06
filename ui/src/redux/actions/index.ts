import axios from 'axios';
import { Dispatch } from 'react';
import { City } from '../../shared/interfaces';

export const SET_ALL_CITIES = 'SET_ALL_CITIES';

export function getAllCities() {
    return async function (dispatch: Dispatch<{ type: string, payload: City[] }>) {
        try {
            const payload = await axios.get<City[]>('/cities');
            dispatch({ type: SET_ALL_CITIES, payload: payload.data });
        } catch (err) {
            return [];
        }
    }
}