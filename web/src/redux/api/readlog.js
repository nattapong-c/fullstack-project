import axios from 'axios';
import ENV from '../../env.json';

export const getReadLogs = async (params) => {
    try {
        return await axios.get(`${ENV.API_URL}/api/readlog/${params}`, {
            headers: {
                'content-type': 'application/json',
            },
        });
    } catch (error) {
        return error;
    }
};

export const getReadLog = async (id) => {
    try {
        return await axios.get(`${ENV.API_URL}/api/readlog/${id}`, {
            headers: {
                'content-type': 'application/json',
            },
        });
    } catch (error) {
        return error;
    }
};

export const createReadLog = async (data) => {
    try {
        return await axios.post(`${ENV.API_URL}/api/readlog/`, data, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
    } catch (error) {
        return error;
    }
};

export const updateReadLog = async (id, data) => {
    try {
        return await axios.put(`${ENV.API_URL}/api/readlog/${id}`, data, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
    } catch (error) {
        return error;
    }
};

export const deleteReadLog = async (id) => {
    try {
        return await axios.delete(`${ENV.API_URL}/api/readlog/${id}`, {
            headers: {
                'content-type': 'application/json',
            },
        });
    } catch (error) {
        return error;
    }
};