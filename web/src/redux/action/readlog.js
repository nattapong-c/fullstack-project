import * as TYPES from '../type/readlog';
import * as API from '../api/readlog';

export const getReadLogs = (params) => async (dispatch) => {
    dispatch({ type: TYPES.READ_LOG_LIST_REQ });
    try {
        const response = await API.getReadLogs(params);
        if (response.status === 200) {
            dispatch({ type: TYPES.READ_LOG_LIST_SUCCESS, payload: response });
        } else {
            dispatch({ type: TYPES.READ_LOG_LIST_FAIL, payload: response.response.data.error });
        }
    } catch (error) {
        dispatch({ type: TYPES.READ_LOG_LIST_FAIL, payload: error });
    }
};

export const getReadLog = (id) => async (dispatch) => {
    dispatch({ type: TYPES.READ_LOG_INFO_REQ });
    try {
        const response = await API.getReadLog(id);
        if (response.status === 200) {
            dispatch({ type: TYPES.READ_LOG_INFO_SUCCESS, payload: response });
        } else {
            dispatch({ type: TYPES.READ_LOG_INFO_FAIL, payload: response.response.data.error });
        }
    } catch (error) {
        dispatch({ type: TYPES.READ_LOG_INFO_FAIL, payload: error });
    }
};

export const createReadLog = (data) => async (dispatch) => {
    dispatch({ type: TYPES.READ_LOG_CREATE_REQ });
    try {
        const response = await API.createReadLog(data);
        if (response.status === 200) {
            dispatch({ type: TYPES.READ_LOG_CREATE_SUCCESS, payload: response });
        } else {
            dispatch({ type: TYPES.READ_LOG_CREATE_FAIL, payload: response.response.data.error });
        }
    } catch (error) {
        dispatch({ type: TYPES.READ_LOG_CREATE_FAIL, payload: error });
    }
};

export const updateReadLog = (id, data) => async (dispatch) => {
    dispatch({ type: TYPES.READ_LOG_UPDATE_REQ });
    try {
        const response = await API.updateReadLog(id, data);
        if (response.status === 200) {
            dispatch({ type: TYPES.READ_LOG_UPDATE_SUCCESS, payload: response });
        } else {
            dispatch({ type: TYPES.READ_LOG_UPDATE_FAIL, payload: response.response.data.error });
        }
    } catch (error) {
        dispatch({ type: TYPES.READ_LOG_UPDATE_FAIL, payload: error });
    }
};

export const deleteReadLog = (id) => async (dispatch) => {
    dispatch({ type: TYPES.READ_LOG_DELETE_REQ });
    try {
        const response = await API.deleteReadLog(id);
        if (response.status === 200) {
            dispatch({ type: TYPES.READ_LOG_DELETE_SUCCESS, payload: response });
        } else {
            dispatch({ type: TYPES.READ_LOG_DELETE_FAIL, payload: response.response.data.error });
        }
    } catch (error) {
        dispatch({ type: TYPES.READ_LOG_DELETE_FAIL, payload: error });
    }
};