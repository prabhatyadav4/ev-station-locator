import api from './api';

export const getStations = async (params) => {
    const response = await api.get('/stations', { params });
    return response.data;
};

export const getStationById = async (id) => {
    const response = await api.get(`/stations/${id}`);
    return response.data;
};
