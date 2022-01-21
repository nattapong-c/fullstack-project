import * as TYPES from '../type/readlog';

const listState = {
    loading: false,
    error: null,
    logs: [],
    total_item: 0,
    total_page: 0
};

const infoState = {
    loading: false,
    error: null,
    info: null
};

export const readLogListReducer = (state = listState, { type, payload }) => {
    switch (type) {
        case TYPES.READ_LOG_LIST_REQ:
            return { ...state, loading: true };
        case TYPES.READ_LOG_DELETE_REQ:
            return { ...state, loading: true };
        case TYPES.READ_LOG_LIST_SUCCESS:
            return { ...state, loading: false, error: null, logs: payload.data.data.logs, total_item: payload.data.data.total_item, total_page: payload.data.data.total_page };
        case TYPES.READ_LOG_DELETE_SUCCESS:
            return { ...state, loading: false, error: null };
        case TYPES.READ_LOG_LIST_FAIL:
            return { ...state, loading: false, error: payload, logs: [] };
        default:
            return state;
    }
}

export const readLogInfoReducer = (state = infoState, { type, payload }) => {
    switch (type) {
        case TYPES.READ_LOG_INFO_REQ:
            return { ...state, loading: true };
        case TYPES.READ_LOG_UPDATE_REQ:
            return { ...state, loading: true };
        case TYPES.READ_LOG_CREATE_REQ:
            return { ...state, loading: true };
        case TYPES.READ_LOG_INFO_SUCCESS:
            return { ...state, loading: false, error: null, info: payload.data.data };
        case TYPES.READ_LOG_UPDATE_SUCCESS:
            return { ...state, loading: false, error: null, info: payload.data.data };
        case TYPES.READ_LOG_CREATE_SUCCESS:
            return { ...state, loading: false, error: null, info: payload.data.data };
        case TYPES.READ_LOG_INFO_FAIL:
            return { ...state, loading: false, error: payload, info: null };
        case TYPES.READ_LOG_UPDATE_FAIL:
            return { ...state, loading: false, error: payload, info: null };
        case TYPES.READ_LOG_CREATE_FAIL:
            return { ...state, loading: false, error: payload, info: null };
        default:
            return state;
    }
}

export const deleteReadLogReducer = (state = infoState, { type, payload }) => {
    switch (type) {
        case TYPES.READ_LOG_DELETE_REQ:
            return { ...state, loading: true };
        case TYPES.READ_LOG_DELETE_SUCCESS:
            return { ...state, loading: false, error: null, info: payload.data.data };
        case TYPES.READ_LOG_DELETE_FAIL:
            return { ...state, loading: false, error: payload, info: null };
        default:
            return state;
    }
}